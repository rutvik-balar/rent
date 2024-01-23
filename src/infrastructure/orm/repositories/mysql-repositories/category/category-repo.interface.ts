import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import { CategoryDeleteInput } from '../../../../../domain/entities/category/category-delete.interface'
import { CategoryGetDB } from '../../../../../domain/entities/category/category-get.interface'
import { CategoryPatchReq } from '../../../../../domain/entities/category/category-patch.interface'
import { CategoryPostReq } from '../../../../../domain/entities/category/category-post.interface'
import { Pagination } from '../../../../../domain/entities/common/pagination'

export type CategoryRepoInterface = {
  create: (input: CategoryPostReq, transaction: Transaction) => void

  get: (
    paginationData: Pagination,
    transaction: Transaction,
    active?: 'active' | 'inactive' | 'both',
  ) => Promise<O.Option<CategoryGetDB[]>>

  getCount: (
    paginationData: Pagination,
    transaction: Transaction,
  ) => Promise<number>

  update: (input: CategoryPatchReq, transaction: Transaction) => Promise<number>

  delete: (
    input: CategoryDeleteInput,
    transaction: Transaction,
  ) => Promise<void>
}
