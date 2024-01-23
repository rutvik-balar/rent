import Joi from 'joi'

import { orderByValidationRegExp } from '../../../infrastructure/helpers/validator'
import { commonPaginationSchema } from '../common/pagination.schema'

const validOrderFields = ['id', 'name', 'parent_id', 'created_at', 'updated_at']

export const getCategorySchema = Joi.object({
  ...commonPaginationSchema,
  id: Joi.number(),
  name: Joi.string().min(1),
  parent_id: Joi.number().min(0),
  img_url: Joi.string().min(5),
  create_at: Joi.date(),
  update_at: Joi.date(),
  order: Joi.alternatives(
    Joi.string().pattern(orderByValidationRegExp(validOrderFields)),
    Joi.array().items(
      Joi.string().pattern(orderByValidationRegExp(validOrderFields)),
    ),
  ),
})
