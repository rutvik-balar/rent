import { Router } from 'express'
import multer from 'multer'

import { USER_ROLES } from '../../infrastructure/configs/constants/enums'
import { env } from '../../infrastructure/env'
import { verifyJWTHS512Middleware } from '../../infrastructure/helpers/token/jwt-HS256.token'
import { validation } from '../../infrastructure/helpers/validator'
import { createCategoryController } from '../controller/category/create-category.controller'
import { deleteCategoryController } from '../controller/category/delete-category.controller'
import { getCategoryController } from '../controller/category/get-category.controller'
import { updateCategoryController } from '../controller/category/update-category.controller'
import { createCategorySchema } from '../validation/category/create-category.schema'
import { deleteCategorySchema } from '../validation/category/delete-category.schema'
import { getCategorySchema } from '../validation/category/get-category.schema'
import { updateCategorySchema } from '../validation/category/update-category.schema'
const route = Router()
const upload = multer()
/**
 * For getting all category
 */
route.get('/', validation(getCategorySchema), getCategoryController)

/**
 * For creating new category
 */
route.post(
  '/',
  upload.single('image'),
  validation(createCategorySchema, 'formData'),
  verifyJWTHS512Middleware(env.JWT_HS512_ACCESS_SECRET, [
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.ADMIN,
  ]),
  createCategoryController,
)

/**
 * For updating category
 */
route.patch(
  '/',
  upload.single('image'),
  validation(updateCategorySchema, 'formData'),
  verifyJWTHS512Middleware(env.JWT_HS512_ACCESS_SECRET, [
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.ADMIN,
  ]),
  updateCategoryController,
)

/**
 * For deleting category
 */
route.delete(
  '/',
  validation(deleteCategorySchema),
  verifyJWTHS512Middleware(env.JWT_HS512_ACCESS_SECRET, [
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.ADMIN,
  ]),
  deleteCategoryController,
)

export const categoryRoute = route
