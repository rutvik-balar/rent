import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import {
  CategoryDeleteInput,
  CategoryDeleteReq,
} from '../../../domain/entities/category/category-delete.interface'
import { convertToPagination } from '../../../domain/entities/common/pagination'
import { ApplicationError } from '../../../infrastructure/configs/constants/application-tag'
import { USER_ROLES } from '../../../infrastructure/configs/constants/enums'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { formatError } from '../../../infrastructure/helpers/res'
import { removeImage } from '../../../infrastructure/helpers/s3'
import { CategoryRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/category/category-repo.interface'

/**
 * Deletes a category with the specified ID using the given category repository and transaction.
 *
 * @param {CategoryDeleteReq} input - The ID of the category to be deleted.
 * @param {CategoryRepoInterface} categoryRepo - The category repository for database interactions.
 * @param {Transaction} t - The Sequelize transaction for ensuring data consistency.
 * @returns {Promise<E.Either<ApplicationError, void>>} - Either a success indication or an error.
 */
export const deleteCategoryUseCase = async (
  input: CategoryDeleteReq,
  categoryRepo: CategoryRepoInterface,
  t: Transaction,
): Promise<E.Either<ApplicationError, void>> => {
  /**
   * Create the input data for category deletion
   */
  const deleteQueryInput: CategoryDeleteInput = {
    id: input.id,
    updated_by: USER_ROLES.SUPER_ADMIN,
    updated_at: new Date(),
  }

  /**
   * Check if the 'archive' flag is set to 'false', and return a forbidden error if it is
   */
  if (input.archive === 'false') {
    return E.left(formatError(StatusCodes.FORBIDDEN, 'FORBIDDEN'))
  } else if (input.archive === 'true') {
    /**
     * Set the 'is_archive' flag to true if 'archive' is set to 'true'
     */
    deleteQueryInput.is_archive = true
  }

  /**
   * Set the default 'active' filter value
   */
  let active: 'active' | 'both' = 'active'

  /**
   * Check if the 'active' flag is set to 'false', and update the 'is_active' flag accordingly
   */
  if (input.active === 'false') {
    deleteQueryInput.is_active = false
  } else if (input.active === 'true') {
    /**
     * Update the 'is_active' flag and set 'active' filter to 'both' if 'active' is set to 'true'
     */
    deleteQueryInput.is_active = true
    active = 'both'
  }

  /**
   * Convert ID to pagination filter for the database query
   */
  const filterById = convertToPagination({
    id: input.id.toString(),
  })

  /**
   * Check if the category with the specified ID exists
   */
  const category = await categoryRepo.get(filterById, t, active)

  /**
   * If the category exists, proceed with deletion and return success
   */
  if (O.isSome(category)) {
    /**
     * Check if the category has an image URL and if 'archive' is set to true, remove the image and update 'img_url' to an empty string
     */
    if (category.value[0].img_url && deleteQueryInput.is_archive === true) {
      await removeImage(category.value[0].img_url)
      deleteQueryInput.img_url = ''
    }

    /**
     * Return success after deleting the category
     */
    return E.right(await categoryRepo.delete(deleteQueryInput, t))
  } else {
    /**
     * If the category does not exist, return an error indicating that no data was found
     */
    return E.left(formatError(StatusCodes.NOT_FOUND, 'NO_DATA_FOUND'))
  }
}
