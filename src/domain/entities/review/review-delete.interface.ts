/**
 *
 * @export
 * @interface ReviewDeleteReq
 */
export interface ReviewDeleteReq {
  /**
   * @type {number}
   * @memberof ReviewDeleteReq
   */
  reviewer_id?: number
  /**
   * @type {number}
   * @memberof ReviewDeleteReq
   */
  reviewed_id: number
  /**
   *
   * @type {enum('true','false')}
   * @memberof ReviewDeleteReq
   */
  active?: string
  /**
   *
   * @type {enum('true','false')}
   * @memberof ReviewDeleteReq
   */
  archive?: string
  /**
   *
   * @type {enum('true','false')}
   * @memberof ReviewDeleteReq
   */
  updated_by?: string
}

export interface ReviewDeleteInput {
  /**
   * @type {number}
   * @memberof ReviewDeleteInput
   */
  reviewer_id?: number
  /**
   * @type {number}
   * @memberof ReviewDeleteInput
   */
  reviewed_id: number
  /**
   *
   * @type {boolean}
   * @memberof ReviewDeleteInput
   */
  is_active: boolean
  /**
   *
   * @type {Date}
   * @memberof ReviewDeleteInput
   */
  updated_at: Date
  /**
   *
   * @type {string}
   * @memberof ReviewDeleteInput
   */
  updated_by: string
}
