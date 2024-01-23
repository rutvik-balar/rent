import { Router } from 'express'

import { env } from '../../infrastructure/env'
import { verifyJWTHS512Middleware } from '../../infrastructure/helpers/token/jwt-HS256.token'
import { validation } from '../../infrastructure/helpers/validator'
import { createReviewController } from '../controller/review/create-review.controller'
import { deleteReviewController } from '../controller/review/delete-review.controller'
import { getReviewController } from '../controller/review/get-review.controller'
import { updateReviewController } from '../controller/review/update-review.controller'
import { createReviewSchema } from '../validation/review/create-review.schema'
import { deleteReviewSchema } from '../validation/review/delete-review.schema'
import { getReviewSchema } from '../validation/review/get-review.schema'
import { updateReviewSchema } from '../validation/review/update-review.schema'
const route = Router()
/**
 * For getting all review
 */
route.get(
  '/',
  validation(getReviewSchema),
  verifyJWTHS512Middleware(env.JWT_HS512_ACCESS_SECRET),
  getReviewController,
)

/**
 * For creating new review
 */
route.post(
  '/',
  validation(createReviewSchema),
  verifyJWTHS512Middleware(env.JWT_HS512_ACCESS_SECRET),
  createReviewController,
)

/**
 * For updating review
 */
route.patch(
  '/',
  validation(updateReviewSchema),
  verifyJWTHS512Middleware(env.JWT_HS512_ACCESS_SECRET),
  updateReviewController,
)

/**
 * For deleting review
 */
route.delete(
  '/',
  validation(deleteReviewSchema),
  verifyJWTHS512Middleware(env.JWT_HS512_ACCESS_SECRET),
  deleteReviewController,
)

export const reviewRoute = route
