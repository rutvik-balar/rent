import Joi from 'joi'

import { commonPaginationSchema } from '../common/pagination.schema'

export const getUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone_number: Joi.string().min(10),
  create_at: Joi.date(),
  update_at: Joi.date(),
  ...commonPaginationSchema,
})
