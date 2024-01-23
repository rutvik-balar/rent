import Joi from 'joi'

import { orderByValidationRegExp } from '../../../infrastructure/helpers/validator'
import { commonPaginationSchema } from '../common/pagination.schema'

const validOrderFields = [
  'reviewer_id',
  'reviewed_id',
  'rating',
  'created_at',
  'updated_at',
]

export const getReviewSchema = Joi.object({
  ...commonPaginationSchema,
  id: Joi.number(),
  reviewer_id: Joi.number(),
  reviewed_id: Joi.number(),
  comment: Joi.string().min(2),
  created_at: Joi.date(),
  updated_at: Joi.date(),
  order: Joi.alternatives(
    Joi.string().pattern(orderByValidationRegExp(validOrderFields)),
    Joi.array().items(
      Joi.string().pattern(orderByValidationRegExp(validOrderFields)),
    ),
  ),
})
