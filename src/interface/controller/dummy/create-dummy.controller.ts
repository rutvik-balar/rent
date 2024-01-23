import { NextFunction, Request, Response } from 'express'

import { createDummyUseCase } from '../../../application/usecase/dummy/create-dummy.usecase'
import { DummyPostReq } from '../../../domain/entities/dummy/dummy-post.interface'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { handleResult } from '../../../infrastructure/helpers/res'
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo'
import { mysqlDummyRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/dummy/dummy.repo'

export const createDummyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const input: DummyPostReq = req.body
    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return await createDummyUseCase(input, mysqlDummyRepo, t)
    })
    handleResult(req, res, next, StatusCodes.CREATED, 'CREATED', data)
  } catch (error) {
    next(error)
  }
}
