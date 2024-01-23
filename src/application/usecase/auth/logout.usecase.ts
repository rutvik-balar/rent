import * as E from 'fp-ts/Either'
import { Transaction } from 'sequelize'

import {
  FindLoginReq,
  LoginDetails,
} from '../../../domain/entities/auth/login.interface'
import { ApplicationError } from '../../../infrastructure/configs/constants/application-tag'
import { AuthRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/auth/auth-repo.interface'

export const logoutUseCase = async (
  input: FindLoginReq,
  authRepo: AuthRepoInterface,
  t: Transaction,
): Promise<E.Either<ApplicationError, void>> => {
  /**
   * creating data to remove refresh token
   */
  const loginDetailsInput: LoginDetails = {
    ...input,
    is_active: false,
    refresh_token: '',
  }

  /**
   * updating the login table
   */
  const loginDetails = await authRepo.updateLoginDetails(loginDetailsInput, t)
  return E.right(loginDetails)
}
