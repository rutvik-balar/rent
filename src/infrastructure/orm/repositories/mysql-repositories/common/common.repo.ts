import { Op, Transaction, WhereOptions } from 'sequelize'

import {
  OrderField,
  PaginationField,
} from '../../../../../domain/entities/common/pagination'
import { wrapInTransaction } from '../../../sequelize'
import { CommonRepoInterface } from './common-repo.interface'

export const mysqlCommonRepo: CommonRepoInterface<Transaction> = {
  wrapInWorkUnitCtx: wrapInTransaction,
  convertOrder: (
    order?: OrderField[],
  ): [string, 'asc' | 'desc'][] | undefined => {
    return order ? order.map((item) => [item.field, item.direction]) : undefined
  },

  /**
   *
   * @param fields
   * @param active default 'active'
   * @returns
   */
  whereCondition: (
    fields?: PaginationField[],
    active?: 'active' | 'inactive' | 'both',
  ): WhereOptions => {
    const where: WhereOptions = {}

    if (fields && fields.length > 0) {
      fields.forEach((field) => {
        switch (field.operation) {
          case 'like':
            where[field.name] = { [Op.like]: `%${field.value}%` }
            break
          case 'equals':
            where[field.name] = { [Op.eq]: field.value }
            break
          case 'not_equals':
            where[field.name] = { [Op.ne]: field.value }
            break
          case 'greater_than':
            where[field.name] = { [Op.gt]: field.value }
            break
          case 'less_than':
            where[field.name] = { [Op.lt]: field.value }
            break
          case 'greater_than_equals':
            where[field.name] = { [Op.gte]: field.value }
            break
          case 'less_than_equals':
            where[field.name] = { [Op.lte]: field.value }
            break
          default:
            where[field.name] = { [Op.eq]: field.value }
            break
        }
      })
    }

    if (active === undefined || active === 'active') {
      where['is_active'] = {
        [Op.eq]: 1,
      }
    } else if (active === 'both') {
      where['is_active'] = {
        [Op.or]: [1, 0],
      }
    } else {
      where['is_active'] = {
        [Op.eq]: 0,
      }
    }

    return where
  },
}
