import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import { Pagination } from '../../../../../domain/entities/common/pagination'
import { DummyGetDB } from '../../../../../domain/entities/dummy/dummy-get.interface'
import { DummyPostReq } from '../../../../../domain/entities/dummy/dummy-post.interface'

export type DummyRepoInterface = {
  create: (input: DummyPostReq, transaction: Transaction) => void

  get: (
    paginationData: Pagination,
    transaction: Transaction,
  ) => Promise<O.Option<DummyGetDB[]>>

  getCount: (
    paginationData: Pagination,
    transaction: Transaction,
  ) => Promise<number>

  update: (input: any, transaction: Transaction) => Promise<void>

  delete: (email: string, transaction: Transaction) => Promise<void>
}
