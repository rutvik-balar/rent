import twilio from 'twilio'

import { CONSTANTS } from '../../configs/constants/constants'

export const sendWhatsappOTP = async (
  to: string,
  otp: string,
): Promise<void> => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const fromNumber = process.env.TWILIO_PHONE_NUMBER
  const client = twilio(accountSid, authToken)
  await client.messages.create({
    body: otp + CONSTANTS.DEFAULT_VALUES.OTP_BODY,
    from: CONSTANTS.DEFAULT_VALUES.SEND_OTP_TO + ':' + fromNumber,
    to: CONSTANTS.DEFAULT_VALUES.SEND_OTP_TO + ':' + to,
  })
}
