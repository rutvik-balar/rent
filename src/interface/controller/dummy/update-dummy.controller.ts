import { NextFunction, Request, Response } from 'express'

import { updateDummyUseCase } from '../../../application/usecase/dummy/update-dummy.usecase'
import { DummyPostReq } from '../../../domain/entities/dummy/dummy-post.interface'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { handleResult } from '../../../infrastructure/helpers/res'
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo'
import { mysqlDummyRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/dummy/dummy.repo'

export const updateDummyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const input: DummyPostReq = req.body

    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return await updateDummyUseCase(input, mysqlDummyRepo, t)
    })
    handleResult(req, res, next, StatusCodes.OK, 'OK', data)
  } catch (error) {
    next(error)
  }
}
