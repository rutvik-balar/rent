import Joi from 'joi'

import { commonPaginationSchema } from '../common/pagination.schema'

export const getDummySchema = Joi.object({
  email: Joi.string(),
  ...commonPaginationSchema,
})
