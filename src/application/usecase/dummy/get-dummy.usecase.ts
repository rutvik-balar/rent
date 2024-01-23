import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import { Pagination } from '../../../domain/entities/common/pagination'
import {
  DummyGetRes,
  dummyGetResFromJSON,
} from '../../../domain/entities/dummy/dummy-get.interface'
import { ApplicationError } from '../../../infrastructure/configs/constants/application-tag'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { formatError } from '../../../infrastructure/helpers/res'
import { DummyRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/dummy/dummy-repo.interface'

export const getDummyUseCase = async (
  paginationData: Pagination,
  dummyRepo: DummyRepoInterface,
  t: Transaction,
): Promise<E.Either<ApplicationError, DummyGetRes>> => {
  const dummy = await dummyRepo.get(paginationData, t)
  const dummyCount = await dummyRepo.getCount(paginationData, t)

  if (O.isSome(dummy)) {
    const data = dummy.value.map((item) => dummyGetResFromJSON(item))
    return E.right({ totalRecord: dummyCount, data })
  } else {
    return E.left(formatError(StatusCodes.NOT_FOUND, 'NO_DATA_FOUND'))
  }
}
