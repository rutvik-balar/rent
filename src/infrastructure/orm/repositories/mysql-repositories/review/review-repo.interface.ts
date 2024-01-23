import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import { Pagination } from '../../../../../domain/entities/common/pagination'
import { ReviewDeleteInput } from '../../../../../domain/entities/review/review-delete.interface'
import { ReviewGetDB } from '../../../../../domain/entities/review/review-get.interface'
import { ReviewPatchReq } from '../../../../../domain/entities/review/review-patch.interface'
import { ReviewPostReq } from '../../../../../domain/entities/review/review-post.interface'

export type ReviewRepoInterface = {
  create: (input: ReviewPostReq, transaction: Transaction) => Promise<void>

  get: (
    paginationData: Pagination,
    transaction: Transaction,
    active?: 'active' | 'inactive' | 'both',
  ) => Promise<O.Option<ReviewGetDB[]>>

  getCount: (
    paginationData: Pagination,
    transaction: Transaction,
  ) => Promise<number>

  update: (input: ReviewPatchReq, transaction: Transaction) => Promise<number>

  delete: (input: ReviewDeleteInput, transaction: Transaction) => Promise<void>
}
