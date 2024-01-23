import { NextFunction, Request, Response } from 'express'

import { updateCategoryUseCase } from '../../../application/usecase/category/update-category.usecase'
import { CategoryPatchReq } from '../../../domain/entities/category/category-patch.interface'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { handleResult } from '../../../infrastructure/helpers/res'
import { mysqlCategoryRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/category/category.repo'
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo'

/**
 * Controller for handling category update requests.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function for error handling.
 * @returns {Promise<void>} - A promise representing the asynchronous execution of the controller logic.
 */
export const updateCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    /**
     * Extract and preprocess input data from the request.
     */
    const input: CategoryPatchReq = { ...req.body, image: req.file }
    const token_details = res.locals.user
    const categoryInput = {
      ...input,
      id: +input.id,
      parent_id: input.parent_id,
      updated_by: token_details.id,
    }

    /**
     * Execute the category update use case within a database transaction.
     */
    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return updateCategoryUseCase(categoryInput, mysqlCategoryRepo, t)
    })

    /**
     * Handle the result of the use case and send an appropriate response.
     */
    handleResult(
      req,
      res,
      next,
      StatusCodes.OK,
      'DATA_UPDATED_SUCCESSFULLY',
      data,
    )
  } catch (error) {
    next(error)
  }
}
