import Joi from 'joi'

import { CONSTANTS } from '../../../infrastructure/configs/constants/constants'

export const updateCategorySchema = Joi.object({
  id: Joi.number().min(1).required(),
  name: Joi.string().min(1).max(64).optional(),
  parent_id: Joi.number().min(0).optional(),
  image: Joi.object({
    size: Joi.number().max(CONSTANTS.DEFAULT_VALUES.IMAGE_SIZE).required(),
    mimetype: Joi.string()
      .regex(/^image\//)
      .required(),
  }).unknown(true),
})
