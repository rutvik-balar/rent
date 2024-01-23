import { NextFunction, Request, Response } from 'express'

import { forgotPasswordUseCase } from '../../../application/usecase/auth/forgot-password.usecase'
import { ForgotPasswordPatchReq } from '../../../domain/entities/auth/forgot-password.interface'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { handleResult } from '../../../infrastructure/helpers/res'
import { mysqlAuthRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/auth/auth.repo'
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo'
import { mysqlUserRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/user/user.repo'

export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const input: ForgotPasswordPatchReq = req.body

    /**
     * Passing data to usecase
     */
    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return await forgotPasswordUseCase(input, mysqlAuthRepo, mysqlUserRepo, t)
    })
    handleResult(
      req,
      res,
      next,
      StatusCodes.OK,
      'PASSWORD_RESET_SUCCESSFULLY',
      data,
    )
  } catch (error) {
    next(error)
  }
}
