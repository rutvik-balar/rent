import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import { Pagination } from '../../../../../domain/entities/common/pagination'
import { ReviewDeleteInput } from '../../../../../domain/entities/review/review-delete.interface'
import { ReviewGetDB } from '../../../../../domain/entities/review/review-get.interface'
import { ReviewPatchReq } from '../../../../../domain/entities/review/review-patch.interface'
import { ReviewPostReq } from '../../../../../domain/entities/review/review-post.interface'
import { optionFormatForArray } from '../../../../helpers/fm-ts'
import Review from '../../../sequelize/entities/t_review'
import { mysqlCommonRepo } from '../common/common.repo'
import { ReviewRepoInterface } from './review-repo.interface'

export const mysqlReviewRepo: ReviewRepoInterface = {
  create: async (input: ReviewPostReq, t: Transaction): Promise<void> => {
    await Review.create({ ...input }, { transaction: t })
  },

  get: async (
    paginationData: Pagination,
    t: Transaction,
    active?: 'active' | 'inactive' | 'both',
  ): Promise<O.Option<ReviewGetDB[]>> => {
    const { fields, order, limit, offset } = paginationData
    const where = mysqlCommonRepo.whereCondition(fields, active)
    const orderBy = mysqlCommonRepo.convertOrder(order)

    const data = await Review.findAll({
      attributes: [
        'reviewer_id',
        'reviewed_id',
        'rating',
        'comment',
        'is_active',
        'created_at',
        'updated_at',
      ],
      where,
      limit,
      offset,
      order: orderBy,
      transaction: t,
    })
    return optionFormatForArray<ReviewGetDB>(data)
  },

  getCount: async (
    paginationData: Pagination,
    t: Transaction,
  ): Promise<number> => {
    const { fields } = paginationData
    const where = mysqlCommonRepo.whereCondition(fields)
    const reviewCount = await Review.count({
      where,
      transaction: t,
    })
    return reviewCount
  },

  update: async (input: ReviewPatchReq, t: Transaction): Promise<number> => {
    const [affectedRowCount] = await Review.update(input, {
      where: {
        reviewer_id: input.reviewer_id,
        reviewed_id: input.reviewed_id,
      },
      transaction: t,
    })
    return affectedRowCount
  },

  delete: async (input: ReviewDeleteInput, t: Transaction): Promise<void> => {
    await Review.update(
      { is_active: input.is_active },
      {
        where: {
          reviewer_id: input.reviewer_id,
          reviewed_id: input.reviewed_id,
        },
        transaction: t,
      },
    )
  },
}
