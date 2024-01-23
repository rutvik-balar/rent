import Otp from '../../../infrastructure/orm/sequelize/entities/t_otp'

/**
 * @export
 * @interface SentOtpPostReq
 */
export interface SentOtpPostReq {
  /**
   *
   * @type {string}
   * @memberof SentOtpPostReq
   */
  phone_number: string
  /**
   *
   * @type {string}
   * @memberof SentOtpPostReq
   */
  device_id: string
}

export interface SentOtpPostReqOtp {
  /**
   *
   * @type {string}
   * @memberof SentOtpPostReq
   */
  phone_number: string
  /**
   *
   * @type {string}
   * @memberof SentOtpPostReq
   */
  otp: string
  /**
   *
   * @type {string}
   * @memberof SentOtpPostReq
   */
  device_id: string
}

export interface GetOtpForVerifyPostReq {
  /**
   *
   * @type {string}
   * @memberof VerifyOtpPostReq
   */
  phone_number: string
  /**
   *
   * @type {string}
   * @memberof VerifyOtpPostReq
   */
  otp: string
  /**
   *
   * @type {string}
   * @memberof VerifyOtpPostReq
   */
  device_id: string
}

export interface GetDetailsForOtpDelete {
  phone_number: string
}

export type OtpGetDB = Pick<
  Otp,
  'id' | 'phone_number' | 'device_id' | 'otp' | 'created_at' | 'updated_at'
>
