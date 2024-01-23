import Joi from 'joi'

export const createDummySchema = Joi.object({
  name: Joi.string().min(1).max(64).required(),
  email: Joi.string().min(1).max(64).required(),
  description: Joi.string().max(64).optional(),
})
