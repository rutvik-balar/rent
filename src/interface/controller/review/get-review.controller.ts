import { NextFunction, Request, Response } from 'express'

import { getReviewUseCase } from '../../../application/usecase/review/get-review.usecase'
import {
  convertToPagination,
  Pagination,
} from '../../../domain/entities/common/pagination'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { handleResult } from '../../../infrastructure/helpers/res'
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo'
import { mysqlReviewRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/review/review.repo'

/**
 * Controller for handling review retrieval requests.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function for error handling.
 * @returns {Promise<void>} - A promise representing the asynchronous execution of the controller logic.
 */
export const getReviewController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    /**
     * Extract pagination data from the request query.
     */
    const paginationData: Pagination = convertToPagination(req.query)
    const userRole = res.locals?.user.role

    /**
     * Execute the review retrieval use case within a database transaction.
     */
    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return getReviewUseCase(paginationData, mysqlReviewRepo, t, userRole)
    })

    /**
     * Handle the result of the use case and send an appropriate response.
     */
    handleResult(
      req,
      res,
      next,
      StatusCodes.OK,
      'GET_USER_DETAILS_SUCCESS',
      data,
    )
  } catch (error) {
    next(error)
  }
}
