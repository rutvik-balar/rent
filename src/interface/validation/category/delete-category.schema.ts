import Joi from 'joi'

export const deleteCategorySchema = Joi.object({
  id: Joi.number().min(1).required(),
  active: Joi.string().valid('true', 'false'),
  archive: Joi.string().valid('true', 'false'),
}).xor('active', 'archive')
