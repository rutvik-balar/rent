import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import { Pagination } from '../../../domain/entities/common/pagination'
import {
  ReviewDataFromJSON,
  ReviewGetRes,
} from '../../../domain/entities/review/review-get.interface'
import { ApplicationError } from '../../../infrastructure/configs/constants/application-tag'
import { USER_ROLES } from '../../../infrastructure/configs/constants/enums'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { formatError } from '../../../infrastructure/helpers/res'
import { ReviewRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/review/review-repo.interface'

/**
 * Retrieves review data based on pagination information using the given review repository and transaction.
 *
 * @param {Pagination} paginationData - The pagination information for fetching review data.
 * @param {ReviewRepoInterface} reviewRepo - The review repository for database interactions.
 * @param {Transaction} t - The Sequelize transaction for ensuring data consistency.
 * @returns {Promise<E.Either<ApplicationError, ReviewGetRes>>} - Either a success indication with review data or an error.
 */
export const getReviewUseCase = async (
  paginationData: Pagination,
  reviewRepo: ReviewRepoInterface,
  t: Transaction,
  userRole: string | undefined,
): Promise<E.Either<ApplicationError, ReviewGetRes>> => {
  /**
   * Fetch review data based on pagination information
   */
  const review =
    userRole === USER_ROLES.ADMIN || userRole === USER_ROLES.SUPER_ADMIN
      ? await reviewRepo.get(paginationData, t, 'both')
      : await reviewRepo.get(paginationData, t)

  /**
   * Fetch the total count of review records based on pagination information
   */
  const reviewCount = await reviewRepo.getCount(paginationData, t)

  /**
   * Check if review data exists
   */
  if (O.isSome(review)) {
    /**
     * Map review data to the response format
     */
    const reviewData = review.value.map((item) => ReviewDataFromJSON(item))

    /**
     * Create the response object with total records and review data
     */
    const reviewPageRes: ReviewGetRes = {
      totalRecord: reviewCount,
      data: reviewData,
    }

    /**
     * Return success with the review response
     */
    return E.right(reviewPageRes)
  } else {
    /**
     * If no review data is found, return an error indicating that no data was found
     */
    return E.left(formatError(StatusCodes.NOT_FOUND, 'NO_DATA_FOUND'))
  }
}
