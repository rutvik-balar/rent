import Joi from 'joi'

export const deleteReviewSchema = Joi.object({
  reviewer_id: Joi.number().min(1),
  reviewed_id: Joi.number().min(1).required(),
  active: Joi.string().valid('true', 'false'),
})
