import { NextFunction, Request, Response } from 'express'

import { getDummyUseCase } from '../../../application/usecase/dummy/get-dummy.usecase'
import {
  convertToPagination,
  Pagination,
} from '../../../domain/entities/common/pagination'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { handleResult } from '../../../infrastructure/helpers/res'
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo'
import { mysqlDummyRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/dummy/dummy.repo'

export const getDummyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const paginationData: Pagination = convertToPagination(req.query)
    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return await getDummyUseCase(paginationData, mysqlDummyRepo, t)
    })
    handleResult(req, res, next, StatusCodes.OK, 'OK', data)
  } catch (error) {
    next(error)
  }
}
