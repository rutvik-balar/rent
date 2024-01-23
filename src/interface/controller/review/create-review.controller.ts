import { NextFunction, Request, Response } from 'express'

import { createReviewUseCase } from '../../../application/usecase/review/create-review.usecase'
import { ReviewPostReq } from '../../../domain/entities/review/review-post.interface'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { handleResult } from '../../../infrastructure/helpers/res'
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo'
import { mysqlReviewRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/review/review.repo'
import { mysqlUserRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/user/user.repo'

/**
 * Controller for handling review creation requests.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function for error handling.
 * @returns {Promise<void>} - A promise representing the asynchronous execution of the controller logic.
 */
export const createReviewController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token_details = res.locals.user
    /**
     * Prepare review input data for use case, including type conversion and attaching user details.
     */
    const input: ReviewPostReq = {
      reviewer_id: token_details.id,
      reviewed_id: +req.body.reviewed_id,
      rating: +req.body.rating,
      comment: req.body.comment,
      created_by: token_details.id,
    }

    /**
     * Execute the review creation use case within a database transaction.
     */
    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return createReviewUseCase(input, mysqlReviewRepo, mysqlUserRepo, t)
    })

    /**
     * Handle the result of the use case and send an appropriate response.
     */
    handleResult(req, res, next, StatusCodes.OK, 'CREATED', data)
  } catch (error) {
    next(error)
  }
}
