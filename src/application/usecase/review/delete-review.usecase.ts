import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import { convertToPagination } from '../../../domain/entities/common/pagination'
import {
  ReviewDeleteInput,
  ReviewDeleteReq,
} from '../../../domain/entities/review/review-delete.interface'
import { ApplicationError } from '../../../infrastructure/configs/constants/application-tag'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { formatError } from '../../../infrastructure/helpers/res'
import { ReviewRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/review/review-repo.interface'

/**
 * Deletes a review with the specified ID using the given review repository and transaction.
 *
 * @param {ReviewDeleteReq} input - The ID of the review to be deleted.
 * @param {ReviewRepoInterface} reviewRepo - The review repository for database interactions.
 * @param {Transaction} t - The Sequelize transaction for ensuring data consistency.
 * @returns {Promise<E.Either<ApplicationError, void>>} - Either a success indication or an error.
 */
export const deleteReviewUseCase = async (
  input: ReviewDeleteReq,
  reviewRepo: ReviewRepoInterface,
  t: Transaction,
): Promise<E.Either<ApplicationError, void>> => {
  if (input.reviewer_id === undefined) {
    return E.left(
      formatError(StatusCodes.BAD_REQUEST, 'ANY_REQUIRED', {
        field: 'reviewer_id',
      }),
    )
  }

  /**
   * Create the input data for review deletion
   */
  const deleteReviewInput: ReviewDeleteInput = {
    ...input,
    is_active: input.active === 'true',
    updated_by: input.reviewed_id.toString(),
    updated_at: new Date(),
  }

  /**
   * Set the default 'active' filter value
   */
  let active: 'active' | 'both' = 'active'

  /**
   * Check if the 'active' flag is set to 'false', and update the 'is_active' flag accordingly
   */
  if (input.active === 'true') {
    /**
     * Update the 'is_active' flag and set 'active' filter to 'both' if 'active' is set to 'true'
     */
    active = 'both'
  }

  /**
   * Convert ID to pagination filter for the database query
   */
  const filterById = convertToPagination({
    reviewer_id: input.reviewer_id,
    reviewed_id: input.reviewed_id,
  })

  /**
   * Check if the review with the specified ID exists
   */
  const review = await reviewRepo.get(filterById, t, active)

  /**
   * If the review exists, proceed with deletion and return success
   */
  if (O.isSome(review)) {
    /**
     * Return success after deleting the review
     */
    return E.right(await reviewRepo.delete(deleteReviewInput, t))
  } else {
    /**
     * If the review does not exist, return an error indicating that no data was found
     */
    return E.left(formatError(StatusCodes.NOT_FOUND, 'NO_DATA_FOUND'))
  }
}
