import { Router } from 'express'

import { errorResponse } from '../infrastructure/helpers/res'
import { authRoute } from '../interface/router/auth.route'
import { categoryRoute } from '../interface/router/category.route'
import { dummyRoute } from '../interface/router/dummy.route'
import { reviewRoute } from '../interface/router/review.route'
import { userRoute } from '../interface/router/user.route'
import { apiDocs } from './api-docs'

/**
 * V1 routes
 */
export function path() {
  const router = Router()

  apiDocs(router)

  router.use(`/dummy`, dummyRoute)

  router.use(`/auth`, authRoute)

  router.use(`/user`, userRoute)

  router.use(`/category`, categoryRoute)

  router.use(`/review`, reviewRoute)

  router.all('**', (_req, res) => {
    return res.status(404).json({
      version: '1.0',
    })
  })

  /**
   * Middleware to send response
   */
  router.use(errorResponse)

  return router
}
