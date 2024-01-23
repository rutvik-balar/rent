import Joi from 'joi'

export const loginSchema = Joi.object({
  phone_number: Joi.string().min(10).required(),
  password: Joi.string().min(6).required(),
  device_id: Joi.string().min(3).required(),
  device_token: Joi.string().min(3),
  os: Joi.string().min(1),
})
