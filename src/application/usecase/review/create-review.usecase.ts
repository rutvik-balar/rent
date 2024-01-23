import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import { convertToPagination } from '../../../domain/entities/common/pagination'
import { ReviewPatchReq } from '../../../domain/entities/review/review-patch.interface'
import { ReviewPostReq } from '../../../domain/entities/review/review-post.interface'
import { ApplicationError } from '../../../infrastructure/configs/constants/application-tag'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { formatError } from '../../../infrastructure/helpers/res'
import { ReviewRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/review/review-repo.interface'
import { UserRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/user/user-repo.interface'

/**
 * Creates a review based on the provided input, using the given review repository and transaction.
 *
 * @param {ReviewPostReq} input - The input data for creating a review.
 * @param {ReviewRepoInterface} reviewRepo - The review repository for database interactions.
 * @param {Transaction} t - The Sequelize transaction for ensuring data consistency.
 * @returns {Promise<E.Either<ApplicationError, void>>} - Either a success indication or an error.
 */
export const createReviewUseCase = async (
  input: ReviewPostReq,
  reviewRepo: ReviewRepoInterface,
  userRepo: UserRepoInterface,
  t: Transaction,
): Promise<E.Either<ApplicationError, void>> => {
  /**
   * If the user not exists, return an error
   */
  const userFilter = convertToPagination({
    id: input.reviewed_id,
  })
  const user = await userRepo.get(userFilter, t)
  if (O.isNone(user)) {
    return E.left(formatError(StatusCodes.NOT_FOUND, 'NO_DATA_FOUND'))
  }

  /**
   * If the review already exists, return an error
   */
  if (input.reviewed_id === input.reviewer_id) {
    return E.left(formatError(StatusCodes.CONFLICT, 'FORBIDDEN'))
  }

  /**
   * Check if a review with the provided review already exists for that person
   */
  const reviewFilter = convertToPagination({
    reviewer_id: input.reviewer_id,
    reviewed_id: input.reviewed_id,
  })
  const review = await reviewRepo.get(reviewFilter, t, 'both')

  /**
   * If the review already exists, return an error
   */
  if (O.isSome(review)) {
    console.log(review.value[0])
    if (review.value[0].is_active === 1) {
      return E.left(formatError(StatusCodes.CONFLICT, 'ALREADY_EXIST'))
    } else {
      const { ...updateInput } = input
      const updatedReviewInput: ReviewPatchReq & { is_active: number } = {
        ...updateInput,
        updated_at: new Date(),
        updated_by: input.reviewer_id!.toString(),
        is_active: 1,
      }
      await reviewRepo.update(updatedReviewInput, t)
      return E.right(undefined)
    }
  } else {
    return E.right(await reviewRepo.create(input, t))
  }
}
