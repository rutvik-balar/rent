import Joi from 'joi'

export const registrationSchema = Joi.object({
  name: Joi.string().min(2).required(),
  phone_number: Joi.string().min(10).required(),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  device_id: Joi.string().min(3).required(),
  otp: Joi.string().length(6).required(),
  device_token: Joi.string().min(3),
  os: Joi.string().min(1),
})
