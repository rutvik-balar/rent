/**
 * @export
 * @interface ReviewPostReq
 */
export interface ReviewPostReq {
  /**
   *
   * @type {number}
   * @memberof ReviewPostReq
   */
  reviewer_id?: number
  /**
   *
   * @type {number}
   * @memberof ReviewPostReq
   */
  reviewed_id: number
  /**
   *
   * @type {number}
   * @memberof ReviewPostReq
   */
  rating: number
  /**
   *
   * @type {string}
   * @memberof ReviewPostReq
   */
  comment: string
  /**
   *
   * @type {string}
   * @memberof ReviewPostReq
   */
  created_by?: string
}
