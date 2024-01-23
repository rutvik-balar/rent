import { NextFunction, Request, Response } from 'express'

import { deleteCategoryUseCase } from '../../../application/usecase/category/delete-category.usecase'
import { CategoryDeleteReq } from '../../../domain/entities/category/category-delete.interface'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { handleResult } from '../../../infrastructure/helpers/res'
import { mysqlCategoryRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/category/category.repo'
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo'

/**
 * Controller for handling category deletion requests.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function for error handling.
 * @returns {Promise<void>} - A promise representing the asynchronous execution of the controller logic.
 */
export const deleteCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const input: CategoryDeleteReq = req.body

    /**
     * Verifying user role for authorization.
     * Execute the category deletion use case within a database transaction.
     */
    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return deleteCategoryUseCase(input, mysqlCategoryRepo, t)
    })

    /**
     * Handle the result of the use case and send an appropriate response.
     */
    handleResult(
      req,
      res,
      next,
      StatusCodes.OK,
      input.active === 'true'
        ? 'DATA_RESTORED_SUCCESSFULLY'
        : 'DATA_DELETED_SUCCESSFULLY',
      data,
    )
  } catch (error) {
    next(error)
  }
}
