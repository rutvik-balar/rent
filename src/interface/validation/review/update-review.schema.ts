import Joi from 'joi'

export const updateReviewSchema = Joi.object({
  reviewed_id: Joi.number().min(1).required(),
  rating: Joi.number().min(0.01).max(5).required(),
  comment: Joi.string().min(2).required(),
})
