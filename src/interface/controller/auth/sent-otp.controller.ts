import { NextFunction, Request, Response } from 'express'

import { sentOtpUseCase } from '../../../application/usecase/auth/sent-otp.usecase'
import { SentOtpPostReqOtp } from '../../../domain/entities/auth/sent-otp.interface'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { handleResult } from '../../../infrastructure/helpers/res'
import { mysqlAuthRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/auth/auth.repo'
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo'

export const sentOtpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const input: SentOtpPostReqOtp = req.body

    /**
     * Passing data to usecase
     */
    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return await sentOtpUseCase(input, mysqlAuthRepo, t)
    })
    handleResult(
      req,
      res,
      next,
      StatusCodes.CREATED,
      'OTP_SENT_SUCCESSFULLY',
      data,
    )
  } catch (error) {
    next(error)
  }
}
