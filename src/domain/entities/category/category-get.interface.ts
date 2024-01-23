import Category from '../../../infrastructure/orm/sequelize/entities/m_category'

/**
 *
 * @export
 * @interface CategoryGet
 */
export interface CategoryGet {
  /**
   *
   * @type {BigInt}
   * @memberof CategoryGet
   */
  id: bigint
  /**
   *
   * @type {string}
   * @memberof CategoryGet
   */
  name: string
  /**
   *
   * @type {BigInt}
   * @memberof CategoryGet
   */
  parent_id: bigint
  /**
   *
   * @type {string}
   * @memberof CategoryGet
   */
  img_url: string
  /**
   *
   * @type {Date}
   * @memberof CategoryGet
   */
  created_at?: Date
  /**
   *
   * @type {Date}
   * @memberof CategoryGet
   */
  updated_at?: Date
}

export interface CategoryGetRes {
  totalRecord: number
  data: CategoryGet[]
}

export type CategoryGetDB = Pick<
  Category,
  'id' | 'name' | 'parent_id' | 'img_url' | 'created_at' | 'updated_at'
>

export function categoryGetResFromJSON(json: any): CategoryGet {
  return categoryGetResFromJSONTyped(json)
}

export function categoryGetResFromJSONTyped(json: any): CategoryGet {
  if (json === undefined || json === null) {
    return json
  }
  return {
    id: json['id'],
    name: json['name'],
    parent_id: json['parent_id'],
    img_url: json['img_url'],
    created_at: !json['created_at'] ? undefined : json['created_at'],
    updated_at: !json['updated_at'] ? undefined : json['updated_at'],
  }
}
