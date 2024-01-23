import { NextFunction, Request, Response } from 'express'

import { logoutUseCase } from '../../../application/usecase/auth/logout.usecase'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { handleResult } from '../../../infrastructure/helpers/res'
import { mysqlAuthRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/auth/auth.repo'
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo'

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    /**
     * getting token details
     */
    const token_details = res.locals.user

    /**
     * making data for passing it to usecase
     */
    const query = {
      device_id: req.body.device_id as string,
      user_id: token_details.id,
    }

    /**
     * Passing data to usecase
     */
    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return await logoutUseCase(query, mysqlAuthRepo, t)
    })
    handleResult(req, res, next, StatusCodes.OK, 'LOGOUT_SUCCESSFUL', data)
  } catch (error) {
    next(error)
  }
}
