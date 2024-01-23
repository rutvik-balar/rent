/**
 *
 * @export
 * @interface CategoryDeleteReq
 */
export interface CategoryDeleteReq {
  /**
   *
   * @type {BigInt}
   * @memberof CategoryDeleteReq
   */
  id: bigint
  /**
   *
   * @type {enum('true','false')}
   * @memberof CategoryDeleteReq
   */
  active?: string
  /**
   *
   * @type {enum('true','false')}
   * @memberof CategoryDeleteReq
   */
  archive?: string
}

export interface CategoryDeleteInput {
  /**
   *
   * @type {BigInt}
   * @memberof CategoryDeleteInput
   */
  id: bigint
  /**
   *
   * @type {boolean}
   * @memberof CategoryDeleteInput
   */
  is_active?: boolean
  /**
   *
   * @type {boolean}
   * @memberof CategoryDeleteInput
   */
  is_archive?: boolean
  /**
   *
   * @type {string}
   * @memberof CategoryDeleteReq
   */
  img_url?: string
  /**
   *
   * @type {Date}
   * @memberof CategoryDeleteInput
   */
  updated_at?: Date
  /**
   *
   * @type {string}
   * @memberof CategoryDeleteInput
   */
  updated_by?: string
}
