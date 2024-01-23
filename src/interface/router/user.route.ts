import { Router } from 'express'

import { env } from '../../infrastructure/env'
import { verifyJWTHS512Middleware } from '../../infrastructure/helpers/token/jwt-HS256.token'
import { validation } from '../../infrastructure/helpers/validator'
import { getUserController } from '../controller/user/get-user.controller'
import { getUserSchema } from '../validation/user/get-user.schema'

const route = Router()

/**
 * For getting user details
 */
route.get(
  '/',
  validation(getUserSchema),
  verifyJWTHS512Middleware(env.JWT_HS512_ACCESS_SECRET),
  getUserController,
)

export const userRoute = route
