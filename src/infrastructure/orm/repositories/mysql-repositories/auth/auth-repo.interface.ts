import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import {
  FindLoginReq,
  LoginDetails,
} from '../../../../../domain/entities/auth/login.interface'
import { SentOtpPostReq } from '../../../../../domain/entities/auth/sent-otp.interface'
import {
  GetOtpForVerifyPostReq,
  OtpGetDB,
} from '../../../../../domain/entities/auth/sent-otp.interface'

export type AuthRepoInterface = {
  insertOtp: (input: SentOtpPostReq, transaction: Transaction) => void
  getOneOtp: (input: GetOtpForVerifyPostReq) => Promise<O.Option<OtpGetDB>>
  deleteOtp: (input: GetOtpForVerifyPostReq, transaction: Transaction) => void
  getLoginDetails: (input: FindLoginReq) => Promise<O.Option<LoginDetails>>
  insertLoginDetails: (input: LoginDetails, transaction: Transaction) => void
  updateLoginDetails: (input: LoginDetails, transaction: Transaction) => void
}
