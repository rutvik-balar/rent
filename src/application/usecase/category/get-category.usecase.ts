import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { Transaction } from 'sequelize'

import {
  CategoryGetRes,
  categoryGetResFromJSON,
} from '../../../domain/entities/category/category-get.interface'
import { Pagination } from '../../../domain/entities/common/pagination'
import { ApplicationError } from '../../../infrastructure/configs/constants/application-tag'
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes'
import { env } from '../../../infrastructure/env'
import { formatError } from '../../../infrastructure/helpers/res'
import { CategoryRepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/category/category-repo.interface'

/**
 * Retrieves category data based on pagination information using the given category repository and transaction.
 *
 * @param {Pagination} paginationData - The pagination information for fetching category data.
 * @param {CategoryRepoInterface} categoryRepo - The category repository for database interactions.
 * @param {Transaction} t - The Sequelize transaction for ensuring data consistency.
 * @returns {Promise<E.Either<ApplicationError, CategoryGetRes>>} - Either a success indication with category data or an error.
 */
export const getCategoryUseCase = async (
  paginationData: Pagination,
  categoryRepo: CategoryRepoInterface,
  t: Transaction,
): Promise<E.Either<ApplicationError, CategoryGetRes>> => {
  /**
   * Fetch category data based on pagination information
   */
  const category = await categoryRepo.get(paginationData, t)

  /**
   * Fetch the total count of category records based on pagination information
   */
  const categoryCount = await categoryRepo.getCount(paginationData, t)

  /**
   * Check if category data exists
   */
  if (O.isSome(category)) {
    /**
     * Map category data to the response format
     */
    const categoryData = category.value.map((item) =>
      categoryGetResFromJSON(item),
    )

    /**
     * Update image URLs with the base URL
     */
    categoryData?.map((category) => {
      category.img_url = env.IMG_BASE_URL + category.img_url
    })

    /**
     * Create the response object with total records and category data
     */
    const categoryPageRes: CategoryGetRes = {
      totalRecord: categoryCount,
      data: categoryData,
    }

    /**
     * Return success with the category response
     */
    return E.right(categoryPageRes)
  } else {
    /**
     * If no category data is found, return an error indicating that no data was found
     */
    return E.left(formatError(StatusCodes.NOT_FOUND, 'NO_DATA_FOUND'))
  }
}
