import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import { categoryGetResFromJSON } from '../../../domain/entities/category/category-get.interface'
import { CategoryPatchReq } from '../../../domain/entities/category/category-patch.interface'
import { convertToPagination } from '../../../domain/entities/common/pagination'
import { ApplicationError } from '../../../infrastructure/configs/constants/application-tag'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { formatError } from '../../../infrastructure/helpers/res'
import { removeImage, uploadImage } from '../../../infrastructure/helpers/s3'
import { CategoryRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/category/category-repo.interface'

/**
 * Updates a category based on the provided input using the given category repository and transaction.
 *
 * @param {CategoryPatchReq} input - The input data for updating a category.
 * @param {CategoryRepoInterface} categoryRepo - The category repository for database interactions.
 * @param {Transaction} t - The Sequelize transaction for ensuring data consistency.
 * @returns {Promise<E.Either<ApplicationError, void>>} - Either a success indication or an error.
 */
export const updateCategoryUseCase = async (
  input: CategoryPatchReq,
  categoryRepo: CategoryRepoInterface,
  t: Transaction,
): Promise<E.Either<ApplicationError, void>> => {
  /**
   * Check if the provided parent category exists
   */
  if (input.parent_id && +input?.parent_id !== 0) {
    const parentFilter = convertToPagination({
      id: input.parent_id,
    })
    const categoryByParent = await categoryRepo.get(parentFilter, t)

    /**
     * If the parent category does not exist, return an error
     */
    if (!O.isSome(categoryByParent)) {
      return E.left(formatError(StatusCodes.CONFLICT, 'PARENT_NOT_EXISTS'))
    }
  }

  /**
   * Check if the category name already exists (excluding the current category)
   */
  if (input.name) {
    const nameFilter = convertToPagination({
      name: input.name,
      id: `${input.id} | not_equals`,
    })
    const category = await categoryRepo.get(nameFilter, t, 'both')

    /**
     * If the category name already exists, return an error
     */
    if (O.isSome(category)) {
      return E.left(formatError(StatusCodes.CONFLICT, 'NAME_ALREADY_EXISTS'))
    }
  }

  /**
   * Flow for updating the image if exists in request else removing it
   */
  const inputWithUrl: CategoryPatchReq = {
    id: input.id,
    name: input?.name,
    parent_id: input?.parent_id,
    img_url: '',
    updated_at: new Date(),
  }

  /**
   * If an image is provided in the request, upload it and update the input
   */
  if (input.image) {
    const { fileName } = await uploadImage(input.image!)
    inputWithUrl.img_url = fileName
  }

  /**
   * Fetch the category data to check if an image needs to be removed
   */
  const categoryFilter = {
    id: input.id.toString(),
  }
  const category = await categoryRepo.get(
    convertToPagination(categoryFilter),
    t,
  )
  if (O.isSome(category)) {
    const categoryData = category.value.map((item) =>
      categoryGetResFromJSON(item),
    )

    /**
     * If the category has an existing image, remove it
     */
    if (categoryData[0].img_url) {
      await removeImage(categoryData[0].img_url)
    }
  }

  /**
   * Update the category and check the affected row count
   */
  const affectedRowCount = await categoryRepo.update(inputWithUrl, t)

  /**
   * If no rows are affected, return an error indicating no data was found
   */
  if (!affectedRowCount) {
    return E.left(formatError(StatusCodes.NOT_FOUND, 'NO_DATA_FOUND'))
  }

  /**
   * Return success if the update is successful
   */
  return E.right(undefined)
}
