import { NextFunction, Request, Response } from 'express'

import { deleteDummyUseCase } from '../../../application/usecase/dummy/delete-dummy.usecase'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { formatError, handleResult } from '../../../infrastructure/helpers/res'
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo'
import { mysqlDummyRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/dummy/dummy.repo'

export const deleteDummyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const email = req.query.email as string
    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return await deleteDummyUseCase(email, mysqlDummyRepo, t)
    })
    handleResult(req, res, next, StatusCodes.OK, 'OK', data)
  } catch (error: any) {
    switch (error?.message) {
      case 'NO_DATA_FOUND': {
        const errorFormat = formatError(StatusCodes.NOT_FOUND, 'NO_DATA_FOUND')
        next(errorFormat)
        break
      }
      default: {
        next(error)
        break
      }
    }
  }
}
