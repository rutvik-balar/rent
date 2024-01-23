import twilio from 'twilio'

import { CONSTANTS } from '../../configs/constants/constants'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = twilio(accountSid, authToken)

/**
 * send SMS
 * @param mobileNumber @example +919876543210
 * @param body @example Your OTP is 123456 from <company name>
 */
export const sendSMS = async (
  mobileNumber: string,
  otp: string,
): Promise<void> => {
  await client.messages.create({
    body: otp + CONSTANTS.DEFAULT_VALUES.OTP_BODY,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: mobileNumber,
  })
}
