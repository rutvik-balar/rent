import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import { Pagination } from '../../../domain/entities/common/pagination'
import {
  UserGetRes,
  UserGetResDataInnerFromJSON,
} from '../../../domain/entities/user/user-get.interface'
import { ApplicationError } from '../../../infrastructure/configs/constants/application-tag'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { formatError } from '../../../infrastructure/helpers/res'
import { UserRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/user/user-repo.interface'

export const getUserUseCase = async (
  paginationData: Pagination,
  userRepo: UserRepoInterface,
  t: Transaction,
): Promise<E.Either<ApplicationError, UserGetRes>> => {
  /**
   * getting data to send
   */
  const user = await userRepo.get(paginationData, t)
  const userCount = await userRepo.getCount(paginationData, t)
  if (O.isSome(user)) {
    /**
     * Converting data to send
     */
    const userData = user.value.map((item) => UserGetResDataInnerFromJSON(item))
    const userPageRes = { totalCount: userCount, data: userData }
    return E.right(userPageRes)
  } else {
    return E.left(formatError(StatusCodes.NOT_FOUND, 'NO_DATA_FOUND'))
  }
}
