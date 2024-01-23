import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import {
  LoginPostReq,
  LoginPostReqFromJSON,
  loginRes,
  LoginTokenDetailsFromJSON,
} from '../../../domain/entities/auth/login.interface'
import {
  convertToPagination,
  Pagination,
} from '../../../domain/entities/common/pagination'
import { ApplicationError } from '../../../infrastructure/configs/constants/application-tag'
import { CONSTANTS } from '../../../infrastructure/configs/constants/constants'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { env } from '../../../infrastructure/env'
import { convertToMd5 } from '../../../infrastructure/helpers/hash/md5.hash'
import { formatError } from '../../../infrastructure/helpers/res'
import { generateJWTHS512Token } from '../../../infrastructure/helpers/token/jwt-HS256.token'
import { AuthRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/auth/auth-repo.interface'
import { UserRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/user/user-repo.interface'

export const loginUseCase = async (
  input: LoginPostReq,
  userRepo: UserRepoInterface,
  authRepo: AuthRepoInterface,
  t: Transaction,
): Promise<E.Either<ApplicationError, loginRes>> => {
  input.password = convertToMd5(input.password)

  /**
   * formatting data to Paginated
   */
  const userFilter: Pagination = convertToPagination({
    password: input.password,
    phone_number: input.phone_number,
  })

  /**
   * matching the credentials
   */
  const user = await userRepo.get(userFilter, t)
  if (O.isSome(user)) {
    /**
     * creating tokens
     */
    const refreshToken = generateJWTHS512Token(
      LoginTokenDetailsFromJSON(user.value[0]),
      env.JWT_HS512_REFRESH_SECRET,
      CONSTANTS.DEFAULT_VALUES.REFRESH_TOKEN_DURATION,
    )
    const accessToken = generateJWTHS512Token(
      LoginTokenDetailsFromJSON(user.value[0]),
      env.JWT_HS512_ACCESS_SECRET,
      CONSTANTS.DEFAULT_VALUES.ACCESS_TOKEN_DURATION,
    )

    /**
     * formatting data to be able to save
     */
    const userId = user.value[0].id as number

    const loginDetailsInput = {
      user_id: userId,
      refresh_token: refreshToken,
      is_active: true,
      created_by: `${userId}`,
      updated_by: `${userId}`,
      ...LoginPostReqFromJSON(input),
    }

    /**
     * checking if record already exists
     */
    const loginDetails = await authRepo.getLoginDetails({
      user_id: userId,
      device_id: input.device_id,
    })

    /**
     * save/update the data to user table
     */
    if (O.isNone(loginDetails)) {
      await authRepo.insertLoginDetails(loginDetailsInput, t)
    } else {
      await authRepo.updateLoginDetails(loginDetailsInput, t)
    }

    return E.right({ refresh_token: refreshToken, access_token: accessToken })
  } else {
    return E.left(formatError(StatusCodes.UNAUTHORIZED, 'INVALID_CREDENTIALS'))
  }
}
