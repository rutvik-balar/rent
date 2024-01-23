import Joi from 'joi'

export const commonPaginationSchema = {
  id: Joi.number(),
  limit: Joi.number(),
  offset: Joi.number(),
}
