import { NextFunction, Request, Response } from 'express'

import { updateReviewUseCase } from '../../../application/usecase/review/update-review.usecase'
import { ReviewPatchReq } from '../../../domain/entities/review/review-patch.interface'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { handleResult } from '../../../infrastructure/helpers/res'
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo'
import { mysqlReviewRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/review/review.repo'

/**
 * Controller for handling review update requests.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function for error handling.
 * @returns {Promise<void>} - A promise representing the asynchronous execution of the controller logic.
 */
export const updateReviewController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    /**
     * Extract and preprocess input data from the request.
     */
    const input: ReviewPatchReq = { ...req.body }
    const token_details = res.locals.user
    const reviewInput = {
      reviewer_id: token_details.id,
      reviewed_id: +input.reviewed_id,
      rating: +input.rating,
      comment: input.comment,
      updated_by: token_details.id,
      updated_at: new Date(),
    }

    /**
     * Execute the review update use case within a database transaction.
     */
    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return updateReviewUseCase(reviewInput, mysqlReviewRepo, t)
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
