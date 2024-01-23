import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import { ForgotPasswordUpdateDetailsReq } from '../../../../../domain/entities/auth/forgot-password.interface'
import { RegistrationDbData } from '../../../../../domain/entities/auth/registration.interface'
import { Pagination } from '../../../../../domain/entities/common/pagination'
import { UserGetDB } from '../../../../../domain/entities/user/user-get.interface'
import User from '../../../sequelize/entities/m_user'

export type UserRepoInterface = {
  createUser: (
    input: RegistrationDbData,
    transaction: Transaction,
  ) => Promise<User>

  get: (
    paginationData: Pagination,
    transaction: Transaction,
  ) => Promise<O.Option<UserGetDB[]>>

  getCount: (
    paginationData: Pagination,
    transaction: Transaction,
  ) => Promise<number>

  changePassword: (
    input: ForgotPasswordUpdateDetailsReq,
    transaction: Transaction,
  ) => Promise<number>
}
