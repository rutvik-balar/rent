import { NextFunction, Request, Response } from 'express'

import { deleteReviewUseCase } from '../../../application/usecase/review/delete-review.usecase'
import { ReviewDeleteReq } from '../../../domain/entities/review/review-delete.interface'
import { USER_ROLES } from '../../../infrastructure/configs/constants/enums'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { handleResult } from '../../../infrastructure/helpers/res'
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo'
import { mysqlReviewRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/review/review.repo'

/**
 * Controller for handling review deletion requests.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function for error handling.
 * @returns {Promise<void>} - A promise representing the asynchronous execution of the controller logic.
 */
export const deleteReviewController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const input: ReviewDeleteReq = req.body

    const token_details = res.locals?.user

    /**
     * If the user's role is "user," set reviewer_id from token_details.id otherwise let him Enter
     */
    if (token_details?.role === USER_ROLES.USER) {
      input.reviewer_id = token_details.id
    }

    /**
     * Execute the review deletion use case within a database transaction.
     */
    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return deleteReviewUseCase(input, mysqlReviewRepo, t)
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
