import * as E from 'fp-ts/Either'
import { Transaction } from 'sequelize'

import { SentOtpPostReqOtp } from '../../../domain/entities/auth/sent-otp.interface'
import { ApplicationError } from '../../../infrastructure/configs/constants/application-tag'
import { sendWhatsappOTP } from '../../../infrastructure/helpers/twilio otp/whatsapp-utils'
import { randomNumber } from '../../../infrastructure/helpers/utils/random-number'
import { AuthRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/auth/auth-repo.interface'

export const sentOtpUseCase = async (
  input: SentOtpPostReqOtp,
  authRepo: AuthRepoInterface,
  t: Transaction,
): Promise<E.Either<ApplicationError, void>> => {
  /**
   * Delete otp if already exists
   */
  await authRepo.deleteOtp(input, t)

  /**
   * Generate a random 6-digit number as the OTP
   */
  input.otp = randomNumber(6)

  /**
   * Insert Otp in t_otp
   * @returns {void}
   */
  const result = await authRepo.insertOtp(input, t)

  /**
   * Send otp to whatsapp
   */
  await sendWhatsappOTP(input.phone_number, input.otp)

  /**
   * SMS one
   * sendSMS(input.phone_number, input.otp)
   */
  return E.right(result)
}
