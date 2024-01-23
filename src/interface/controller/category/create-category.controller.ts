import { NextFunction, Request, Response } from 'express'

import { createCategoryUseCase } from '../../../application/usecase/category/create-category.usecase'
import { CategoryPostReq } from '../../../domain/entities/category/category-post.interface'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { handleResult } from '../../../infrastructure/helpers/res'
import { mysqlCategoryRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/category/category.repo'
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo'

/**
 * Controller for handling category creation requests.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function for error handling.
 * @returns {Promise<void>} - A promise representing the asynchronous execution of the controller logic.
 */
export const createCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const input: CategoryPostReq = req.body
    const token_details = res.locals.user
    /**
     * Prepare category input data for use case, including type conversion and attaching user details.
     */
    const categoryInput = {
      ...input,
      parent_id: +input.parent_id,
      created_by: token_details.id,
      image: req.file,
    }

    /**
     * Execute the category creation use case within a database transaction.
     */
    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return createCategoryUseCase(categoryInput, mysqlCategoryRepo, t)
    })

    /**
     * Handle the result of the use case and send an appropriate response.
     */
    handleResult(req, res, next, StatusCodes.OK, 'CREATED', data)
  } catch (error) {
    next(error)
  }
}
