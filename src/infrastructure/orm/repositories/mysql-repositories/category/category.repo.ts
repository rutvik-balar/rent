import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import { CategoryDeleteInput } from '../../../../../domain/entities/category/category-delete.interface'
import { CategoryGetDB } from '../../../../../domain/entities/category/category-get.interface'
import { CategoryPatchReq } from '../../../../../domain/entities/category/category-patch.interface'
import { CategoryPostReq } from '../../../../../domain/entities/category/category-post.interface'
import { Pagination } from '../../../../../domain/entities/common/pagination'
import { optionFormatForArray } from '../../../../helpers/fm-ts'
import Category from '../../../sequelize/entities/m_category'
import { mysqlCommonRepo } from '../common/common.repo'
import { CategoryRepoInterface } from './category-repo.interface'

export const mysqlCategoryRepo: CategoryRepoInterface = {
  create: async (input: CategoryPostReq, t: Transaction): Promise<void> => {
    await Category.create({ ...input }, { transaction: t })
  },

  get: async (
    paginationData: Pagination,
    t: Transaction,
    active?: 'active' | 'inactive' | 'both',
  ): Promise<O.Option<CategoryGetDB[]>> => {
    const { fields, order, limit, offset } = paginationData
    fields?.push({ name: 'is_archive', value: 'false', operation: 'equals' })
    const where = mysqlCommonRepo.whereCondition(fields, active)
    const orderBy = mysqlCommonRepo.convertOrder(order)

    const data = await Category.findAll({
      attributes: [
        'id',
        'name',
        'parent_id',
        'img_url',
        'created_at',
        'updated_at',
      ],
      where,
      limit,
      offset,
      order: orderBy,
      transaction: t,
    })
    return optionFormatForArray<CategoryGetDB>(data)
  },

  getCount: async (
    paginationData: Pagination,
    t: Transaction,
  ): Promise<number> => {
    const { fields } = paginationData
    const where = mysqlCommonRepo.whereCondition(fields)
    const categoryCount = await Category.count({
      where,
      transaction: t,
    })
    return categoryCount
  },

  update: async (input: CategoryPatchReq, t: Transaction): Promise<number> => {
    const [affectedRowCount] = await Category.update(input, {
      where: {
        id: input.id,
        is_archive: 0,
      },
      transaction: t,
    })
    return affectedRowCount
  },

  delete: async (input: CategoryDeleteInput, t: Transaction): Promise<void> => {
    await Category.update(input, {
      where: { id: input.id, is_archive: 0 },
      transaction: t,
    })
  },
}
