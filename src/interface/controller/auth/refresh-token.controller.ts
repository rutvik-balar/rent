import { NextFunction, Request, Response } from 'express'

import { refreshTokenUseCase } from '../../../application/usecase/auth/refresh-token.usecase'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { handleResult } from '../../../infrastructure/helpers/res'
import { mysqlAuthRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/auth/auth.repo'
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo'
import { mysqlUserRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/user/user.repo'

export const refreshTokenController = async (
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
    const input = {
      device_id: req.body.device_id as string,
      user_id: token_details.id,
      refresh_token: (req.headers['authorization'] as string)?.replace(
        'Bearer ',
        '',
      ),
    }

    /**
     * Passing data to usecase
     */
    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return await refreshTokenUseCase(input, mysqlAuthRepo, mysqlUserRepo, t)
    })
    handleResult(req, res, next, StatusCodes.OK, 'OK', data)
  } catch (error) {
    next(error)
  }
}
