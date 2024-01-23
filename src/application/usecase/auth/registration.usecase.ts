import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import moment from 'moment'
import { Transaction } from 'sequelize'

import {
  loginRes,
  LoginTokenDetailsFromJSON,
} from '../../../domain/entities/auth/login.interface'
import {
  RegistrationDbData,
  RegistrationPostReq,
} from '../../../domain/entities/auth/registration.interface'
import { convertToPagination } from '../../../domain/entities/common/pagination'
import { ApplicationError } from '../../../infrastructure/configs/constants/application-tag'
import { CONSTANTS } from '../../../infrastructure/configs/constants/constants'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { env } from '../../../infrastructure/env'
import { convertToMd5 } from '../../../infrastructure/helpers/hash/md5.hash'
import { formatError } from '../../../infrastructure/helpers/res'
import { generateJWTHS512Token } from '../../../infrastructure/helpers/token/jwt-HS256.token'
import { AuthRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/auth/auth-repo.interface'
import { UserRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/user/user-repo.interface'

export const registrationUseCase = async (
  input: RegistrationPostReq,
  authRepo: AuthRepoInterface,
  userRepo: UserRepoInterface,
  t: Transaction,
): Promise<E.Either<ApplicationError, loginRes>> => {
  const phoneNumberFilter = convertToPagination({
    phone_number: input.phone_number,
  })
  const userByPhoneNumber = await userRepo.get(phoneNumberFilter, t)
  if (O.isSome(userByPhoneNumber)) {
    return E.left(
      formatError(StatusCodes.CONFLICT, 'ALREADY_EXIST', {
        field: 'Phone Number',
      }),
    )
  }

  /**
   * checking if the record for otp exists
   */
  const otp = await authRepo.getOneOtp(input)
  if (O.isSome(otp)) {
    /**
     * Saving current and otp time and comparing difference
     */
    const otpCreatedTime = moment(otp.value.created_at)
    const currentTime = moment()
    const timeDifference = currentTime.diff(otpCreatedTime, 'minutes')
    if (timeDifference > CONSTANTS.DEFAULT_VALUES.OTP_DURATION) {
      return E.left(formatError(StatusCodes.UNAUTHORIZED, 'OTP_EXPIRED'))
    }

    /**
     * deleting the record for the otp
     */
    await authRepo.deleteOtp(input, t)

    /**
     * formatting data to be able to save
     */
    const userInput: RegistrationDbData = {
      phone_number: input.phone_number,
      name: input.name,
      email: input.email,
      password: input.password,
    }
    userInput.password = convertToMd5(input.password)
    userInput.created_by = input.phone_number
    userInput.updated_by = input.phone_number

    /**
     * save the data to user table
     */
    const user = await userRepo.createUser(userInput, t)

    const jwtData = {
      id: user.id,
      phone_number: user.phone_number,
      role: user.role,
    }

    /**
     * creating tokens
     */
    const refreshToken = generateJWTHS512Token(
      LoginTokenDetailsFromJSON(jwtData),
      env.JWT_HS512_REFRESH_SECRET,
      CONSTANTS.DEFAULT_VALUES.REFRESH_TOKEN_DURATION,
    )
    const accessToken = generateJWTHS512Token(
      LoginTokenDetailsFromJSON(jwtData),
      env.JWT_HS512_ACCESS_SECRET,
      CONSTANTS.DEFAULT_VALUES.ACCESS_TOKEN_DURATION,
    )

    /**
     * formatting data to be able to save in login table
     */
    const loginDetailsInput = {
      user_id: user.id as number,
      refresh_token: refreshToken,
      is_active: true,
      created_by: `${user.id}`,
      updated_by: `${user.id}`,
      device_id: input.device_id,
      device_token: input.device_token,
      os: input.os,
    }

    /**
     * save the data to login table
     */
    await authRepo.insertLoginDetails(loginDetailsInput, t)

    return E.right({ refresh_token: refreshToken, access_token: accessToken })
  } else {
    return E.left(formatError(StatusCodes.UNAUTHORIZED, 'OTP_INVALID'))
  }
}
