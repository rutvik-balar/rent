import { NextFunction, Request, Response } from 'express'

import { getUserUseCase } from '../../../application/usecase/user/get-user.usecase'
import {
  convertToPagination,
  Pagination,
} from '../../../domain/entities/common/pagination'
import { USER_ROLES } from '../../../infrastructure/configs/constants/enums'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { handleResult } from '../../../infrastructure/helpers/res'
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo'
import { mysqlUserRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/user/user.repo'

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    /**
     * getting token details saved in res by middleware
     */
    const tokenDetails = res.locals.user
    const query = req.query

    /**
     * for updating where clause for user role so it gets only their data
     */
    if (tokenDetails.role === USER_ROLES.USER) {
      query.id = `${tokenDetails.id}`
    }

    /**
     * converting data for the pagination purpose
     */
    const paginationData: Pagination = convertToPagination(query)
    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return await getUserUseCase(paginationData, mysqlUserRepo, t)
    })
    handleResult(
      req,
      res,
      next,
      StatusCodes.OK,
      'GET_USER_DETAILS_SUCCESS',
      data,
    )
  } catch (error) {
    next(error)
  }
}
