import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import { CategoryPostReq } from '../../../domain/entities/category/category-post.interface'
import { convertToPagination } from '../../../domain/entities/common/pagination'
import { ApplicationError } from '../../../infrastructure/configs/constants/application-tag'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { formatError } from '../../../infrastructure/helpers/res'
import { uploadImage } from '../../../infrastructure/helpers/s3'
import { CategoryRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/category/category-repo.interface'

/**
 * Creates a category based on the provided input, using the given category repository and transaction.
 *
 * @param {CategoryPostReq} input - The input data for creating a category.
 * @param {CategoryRepoInterface} categoryRepo - The category repository for database interactions.
 * @param {Transaction} t - The Sequelize transaction for ensuring data consistency.
 * @returns {Promise<E.Either<ApplicationError, void>>} - Either a success indication or an error.
 */
export const createCategoryUseCase = async (
  input: CategoryPostReq,
  categoryRepo: CategoryRepoInterface,
  t: Transaction,
): Promise<E.Either<ApplicationError, void>> => {
  /**
   * Check if the provided parent category ID exists
   */
  if (input.parent_id && input?.parent_id !== 0) {
    const parentFilter = convertToPagination({
      id: input.parent_id.toString(),
    })
    const parentCategory = await categoryRepo.get(parentFilter, t)

    /**
     * If the parent category does not exist, return an error
     */
    if (!O.isSome(parentCategory)) {
      return E.left(formatError(StatusCodes.CONFLICT, 'PARENT_NOT_EXISTS'))
    }
  }

  /**
   * Check if a category with the provided name already exists
   */
  const nameFilter = convertToPagination({
    name: input.name,
  })
  const category = await categoryRepo.get(nameFilter, t, 'both')

  /**
   * If the category already exists, return an error
   */
  if (O.isSome(category)) {
    return E.left(formatError(StatusCodes.CONFLICT, 'ALREADY_EXIST'))
  } else {
    /**
     * Uploading the image data with a random name
     */
    const { fileName } = await uploadImage(input.image!)

    /**
     * If the category does not exist, proceed with category creation and return success
     */
    const inputWithUrl: CategoryPostReq = {
      name: input.name,
      parent_id: input.parent_id,
      img_url: fileName,
    }
    return E.right(await categoryRepo.create(inputWithUrl, t))
  }
}
