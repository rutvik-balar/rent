import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import { Pagination } from '../../../../../domain/entities/common/pagination'
import { DummyGetDB } from '../../../../../domain/entities/dummy/dummy-get.interface'
import { DummyPostReq } from '../../../../../domain/entities/dummy/dummy-post.interface'
import { optionFormatForArray } from '../../../../helpers/fm-ts'
import Dummy from '../../../sequelize/entities/t_dummy'
import { mysqlCommonRepo } from '../common/common.repo'
import { DummyRepoInterface } from './dummy-repo.interface'

export const mysqlDummyRepo: DummyRepoInterface = {
  create: async (input: DummyPostReq, t: Transaction): Promise<void> => {
    await Dummy.create(input, { transaction: t })
  },
  get: async (
    paginationData: Pagination,
    t: Transaction,
  ): Promise<O.Option<DummyGetDB[]>> => {
    const { fields, order, limit, offset } = paginationData
    const where = mysqlCommonRepo.whereCondition(fields)
    const orderBy = mysqlCommonRepo.convertOrder(order)

    const data = await Dummy.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'description',
        'created_at',
        'updated_at',
      ],
      where,
      limit,
      offset,
      order: orderBy,
      transaction: t,
    })
    return optionFormatForArray<DummyGetDB>(data)
  },
  getCount: async (
    paginationData: Pagination,
    t: Transaction,
  ): Promise<number> => {
    const { fields } = paginationData
    const where = mysqlCommonRepo.whereCondition(fields)

    const data = await Dummy.count({
      where,
      transaction: t,
    })
    return data
  },
  update: async (input: DummyPostReq, t: Transaction): Promise<void> => {
    await Dummy.update(
      {
        name: input.name,
        description: input.description,
        update_at: Date.now(),
      },
      { where: { email: input.email }, transaction: t },
    )
  },
  delete: async (email: string, t: Transaction): Promise<void> => {
    await Dummy.update(
      { is_active: 0, update_at: Date.now() },
      { where: { email }, transaction: t },
    )
  },
}
