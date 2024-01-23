import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import { convertToPagination } from '../../../domain/entities/common/pagination'
import { ApplicationError } from '../../../infrastructure/configs/constants/application-tag'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { formatError } from '../../../infrastructure/helpers/res'
import { DummyRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/dummy/dummy-repo.interface'

export const deleteDummyUseCase = async (
  email: string,
  dummyRepo: DummyRepoInterface,
  t: Transaction,
): Promise<E.Either<ApplicationError, void>> => {
  const filter = convertToPagination({
    email,
  })

  const dummy = await dummyRepo.get(filter, t)

  if (O.isSome(dummy)) {
    return E.right(await dummyRepo.delete(email, t))
  } else {
    return E.left(formatError(StatusCodes.NOT_FOUND, 'NO_DATA_FOUND'))
  }
}
