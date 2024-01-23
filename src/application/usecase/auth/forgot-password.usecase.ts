import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import moment from 'moment'
import { Transaction } from 'sequelize'

import { ForgotPasswordPatchReq } from '../../../domain/entities/auth/forgot-password.interface'
import { GetOtpForVerifyPostReq } from '../../../domain/entities/auth/sent-otp.interface'
import { ApplicationError } from '../../../infrastructure/configs/constants/application-tag'
import { CONSTANTS } from '../../../infrastructure/configs/constants/constants'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { convertToMd5 } from '../../../infrastructure/helpers/hash/md5.hash'
import { formatError } from '../../../infrastructure/helpers/res'
import { AuthRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/auth/auth-repo.interface'
import { UserRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/user/user-repo.interface'

export const forgotPasswordUseCase = async (
  input: ForgotPasswordPatchReq,
  authRepo: AuthRepoInterface,
  userRepo: UserRepoInterface,
  t: Transaction,
): Promise<E.Either<ApplicationError, void>> => {
  const otpInput: GetOtpForVerifyPostReq = {
    otp: input.otp,
    phone_number: input.phone_number,
    device_id: input.device_id,
  }

  /**
   * checking if the record for otp exists
   */
  const otp = await authRepo.getOneOtp(otpInput)
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
    await authRepo.deleteOtp(otpInput, t)

    /**
     * formatting data to be able to update
     */
    const inputData = input as ForgotPasswordPatchReq
    inputData.password = convertToMd5(input.password)
    inputData.updated_by = input.phone_number
    inputData.updated_at = new Date()

    /**
     * save the change to user table
     * @returns {void}
     */
    const affectedRows = await userRepo.changePassword(inputData, t)
    if (!affectedRows) {
      return E.left(formatError(StatusCodes.NOT_FOUND, 'NOT_REGISTERED'))
    }
    return E.right(undefined)
  } else {
    return E.left(formatError(StatusCodes.UNAUTHORIZED, 'OTP_INVALID'))
  }
}
