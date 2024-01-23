import Joi from 'joi'

export const sentOtpReqSchema = Joi.object({
  phone_number: Joi.string().min(10).required(),
  device_id: Joi.string().min(3).required(),
})
