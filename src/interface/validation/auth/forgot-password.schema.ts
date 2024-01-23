import Joi from 'joi'

export const forgotPasswordSchema = Joi.object({
  phone_number: Joi.string().min(10).required(),
  password: Joi.string().min(6),
  device_id: Joi.string().min(3).required(),
  otp: Joi.string().length(6).required(),
})
