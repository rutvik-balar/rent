import { NextFunction, Request, Response } from 'express'

import { registrationUseCase } from '../../../application/usecase/auth/registration.usecase'
import { RegistrationPostReq } from '../../../domain/entities/auth/registration.interface'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { handleResult } from '../../../infrastructure/helpers/res'
import { mysqlAuthRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/auth/auth.repo'
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo'
import { mysqlUserRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/user/user.repo'

export const registrationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const input: RegistrationPostReq = req.body

    /**
     * Passing data to usecase
     */
    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return await registrationUseCase(input, mysqlAuthRepo, mysqlUserRepo, t)
    })
    handleResult(
      req,
      res,
      next,
      StatusCodes.OK,
      'REGISTERED_SUCCESSFULLY',
      data,
    )
  } catch (error) {
    next(error)
  }
}
