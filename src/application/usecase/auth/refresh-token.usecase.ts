import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import {
  FindLoginReq,
  LoginDetails,
  loginRes,
  LoginTokenDetailsFromJSON,
} from '../../../domain/entities/auth/login.interface'
import {
  convertToPagination,
  Pagination,
} from '../../../domain/entities/common/pagination'
import { ApplicationError } from '../../../infrastructure/configs/constants/application-tag'
import { CONSTANTS } from '../../../infrastructure/configs/constants/constants'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { env } from '../../../infrastructure/env'
import { formatError } from '../../../infrastructure/helpers/res'
import { generateJWTHS512Token } from '../../../infrastructure/helpers/token/jwt-HS256.token'
import { AuthRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/auth/auth-repo.interface'
import { UserRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/user/user-repo.interface'

export const refreshTokenUseCase = async (
  input: FindLoginReq,
  authRepo: AuthRepoInterface,
  userRepo: UserRepoInterface,
  t: Transaction,
): Promise<E.Either<ApplicationError, loginRes>> => {
  /**
   * formatting data to Paginated
   */
  const userId: Pagination = convertToPagination({
    id: `${input.user_id}`,
  })

  /**
   * matching the credentials
   */
  const user = await userRepo.get(userId, t)
  const loginDetails = await authRepo.getLoginDetails(input)

  if (O.isSome(user) && O.isSome(loginDetails)) {
    /**
     * creating tokens
     */
    const refreshToken = generateJWTHS512Token(
      LoginTokenDetailsFromJSON(user.value[0]),
      env.JWT_HS512_REFRESH_SECRET,
      CONSTANTS.DEFAULT_VALUES.REFRESH_TOKEN_DURATION,
    )
    const accessToken = generateJWTHS512Token(
      LoginTokenDetailsFromJSON(user.value[0]),
      env.JWT_HS512_ACCESS_SECRET,
      CONSTANTS.DEFAULT_VALUES.ACCESS_TOKEN_DURATION,
    )

    /**
     * creating data to update refresh token
     */
    const loginDetailsInput: LoginDetails = {
      ...input,
      is_active: true,
      refresh_token: refreshToken,
    }

    /**
     * updating the table
     */
    await authRepo.updateLoginDetails(loginDetailsInput, t)
    return E.right({ refresh_token: refreshToken, access_token: accessToken })
  } else {
    return E.left(formatError(StatusCodes.UNAUTHORIZED, 'UNAUTHORIZED'))
  }
}
