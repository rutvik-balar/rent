import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import { ForgotPasswordUpdateDetailsReq } from '../../../../../domain/entities/auth/forgot-password.interface'
import { RegistrationDbData } from '../../../../../domain/entities/auth/registration.interface'
import { Pagination } from '../../../../../domain/entities/common/pagination'
import { UserGetDB } from '../../../../../domain/entities/user/user-get.interface'
import { optionFormatForArray } from '../../../../helpers/fm-ts'
import User from '../../../sequelize/entities/m_user'
import { mysqlCommonRepo } from '../common/common.repo'
import { UserRepoInterface } from './user-repo.interface'

export const mysqlUserRepo: UserRepoInterface = {
  createUser: async (
    input: RegistrationDbData,
    t: Transaction,
  ): Promise<User> => {
    return await User.create(input, { transaction: t })
  },

  get: async (
    paginationData: Pagination,
    t: Transaction,
  ): Promise<O.Option<UserGetDB[]>> => {
    const { fields, order, limit, offset } = paginationData
    const where = mysqlCommonRepo.whereCondition(fields)
    const orderBy = mysqlCommonRepo.convertOrder(order)

    const data = await User.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'phone_number',
        'is_active',
        'role',
        'created_at',
        'updated_at',
      ],
      where,
      limit,
      offset,
      order: orderBy,
      transaction: t,
    })
    return optionFormatForArray<UserGetDB>(data)
  },

  getCount: async (
    paginationData: Pagination,
    t: Transaction,
  ): Promise<number> => {
    const { fields } = paginationData
    const where = mysqlCommonRepo.whereCondition(fields)

    const userCount = await User.count({
      where,
      transaction: t,
    })
    return userCount
  },

  changePassword: async (
    input: ForgotPasswordUpdateDetailsReq,
    transaction: Transaction,
  ): Promise<number> => {
    const [affectedRowCount] = await User.update(input, {
      where: {
        phone_number: input.phone_number,
      },
      transaction: transaction,
    })
    return affectedRowCount
  },
}
