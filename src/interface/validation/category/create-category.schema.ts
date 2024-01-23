import Joi from 'joi'

import { CONSTANTS } from '../../../infrastructure/configs/constants/constants'

export const createCategorySchema = Joi.object({
  name: Joi.string().min(1).max(64).required(),
  parent_id: Joi.number().min(0).required(),
  image: Joi.object({
    size: Joi.number().max(CONSTANTS.DEFAULT_VALUES.IMAGE_SIZE).required(),
    mimetype: Joi.string()
      .regex(/^image\//)
      .required(),
  })
    .unknown(true)
    .required(),
})
