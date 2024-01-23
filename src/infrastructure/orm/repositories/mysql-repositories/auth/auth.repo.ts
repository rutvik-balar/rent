import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import {
  FindLoginReq,
  LoginDetails,
} from '../../../../../domain/entities/auth/login.interface'
import { SentOtpPostReq } from '../../../../../domain/entities/auth/sent-otp.interface'
import {
  GetDetailsForOtpDelete,
  GetOtpForVerifyPostReq,
  OtpGetDB,
} from '../../../../../domain/entities/auth/sent-otp.interface'
import { optionFormatForObject } from '../../../../helpers/fm-ts'
import Login from '../../../sequelize/entities/t_login'
import SentOtp from '../../../sequelize/entities/t_otp'
import { AuthRepoInterface } from './auth-repo.interface'

export const mysqlAuthRepo: AuthRepoInterface = {
  insertOtp: async (input: SentOtpPostReq, t: Transaction): Promise<void> => {
    await SentOtp.create(input as OtpGetDB, { transaction: t })
  },

  getOneOtp: async (
    input: GetOtpForVerifyPostReq,
  ): Promise<O.Option<OtpGetDB>> => {
    const otp = await SentOtp.findOne({
      attributes: ['created_at'],
      where: {
        phone_number: input.phone_number,
        otp: input.otp,
        device_id: input.device_id,
      },
    })
    return optionFormatForObject(otp)
  },

  deleteOtp: async (
    input: GetDetailsForOtpDelete,
    t: Transaction,
  ): Promise<void> => {
    await SentOtp.destroy({
      where: {
        phone_number: input.phone_number,
      },
      transaction: t,
    })
  },

  getLoginDetails: async (
    input: FindLoginReq,
  ): Promise<O.Option<LoginDetails>> => {
    const where: FindLoginReq = {
      user_id: input.user_id,
      device_id: input.device_id,
    }
    input.refresh_token && (where.refresh_token = input.refresh_token)
    return optionFormatForObject(
      await Login.findOne({
        attributes: ['id'],
        where: where,
      }),
    )
  },

  insertLoginDetails: async (
    input: LoginDetails,
    t: Transaction,
  ): Promise<void> => {
    await Login.create(input, { transaction: t })
  },

  updateLoginDetails: async (
    input: LoginDetails,
    t: Transaction,
  ): Promise<void> => {
    await Login.update(input, {
      where: {
        user_id: input.user_id,
        device_id: input.device_id,
        is_active: '1',
      },
      transaction: t,
    })
  },
}
