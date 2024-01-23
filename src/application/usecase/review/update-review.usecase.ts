import * as E from 'fp-ts/Either'
import { Transaction } from 'sequelize'

import { ReviewPatchReq } from '../../../domain/entities/review/review-patch.interface'
import { ApplicationError } from '../../../infrastructure/configs/constants/application-tag'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { formatError } from '../../../infrastructure/helpers/res'
import { ReviewRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/review/review-repo.interface'

/**
 * Updates a review based on the provided input using the given review repository and transaction.
 *
 * @param {ReviewPatchReq} input - The input data for updating a review.
 * @param {ReviewRepoInterface} reviewRepo - The review repository for database interactions.
 * @param {Transaction} t - The Sequelize transaction for ensuring data consistency.
 * @returns {Promise<E.Either<ApplicationError, void>>} - Either a success indication or an error.
 */
export const updateReviewUseCase = async (
  input: ReviewPatchReq,
  reviewRepo: ReviewRepoInterface,
  t: Transaction,
): Promise<E.Either<ApplicationError, void>> => {
  /**
   * Update the review and check the affected row count
   */
  const affectedRowCount = await reviewRepo.update(input, t)

  /**
   * If no rows are affected, return an error indicating no input was found
   */
  if (!affectedRowCount) {
    return E.left(formatError(StatusCodes.NOT_FOUND, 'NO_DATA_FOUND'))
  }

  /**
   * Return success if the update is successful
   */
  return E.right(undefined)
}
