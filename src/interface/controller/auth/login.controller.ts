import { NextFunction, Request, Response } from 'express'

import { loginUseCase } from '../../../application/usecase/auth/login.usecase'
import { LoginPostReq } from '../../../domain/entities/auth/login.interface'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { handleResult } from '../../../infrastructure/helpers/res'
import { mysqlAuthRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/auth/auth.repo'
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo'
import { mysqlUserRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/user/user.repo'

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const input: LoginPostReq = req.body

    /**
     * Passing data to usecase
     */
    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return await loginUseCase(input, mysqlUserRepo, mysqlAuthRepo, t)
    })
    handleResult(req, res, next, StatusCodes.OK, 'LOGIN_SUCCESSFUL', data)
  } catch (error) {
    next(error)
  }
}
