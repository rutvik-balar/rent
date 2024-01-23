/**
 * @export
 * @interface ReviewPatchReq
 */
export interface ReviewPatchReq {
  /**
   *
   * @type {number}
   * @memberof ReviewPatchReq
   */
  reviewed_id: number
  /**
   *
   * @type {number}
   * @memberof ReviewPatchReq
   */
  reviewer_id?: number
  /**
   *
   * @type {number}
   * @memberof ReviewPatchReq
   */
  rating: number
  /**
   *
   * @type {string}
   * @memberof ReviewPatchReq
   */
  comment: string
  /**
   *
   * @type {Date}
   * @memberof ReviewPatchReq
   */
  updated_at: Date
  /**
   *
   * @type {Date}
   * @memberof ReviewPatchReq
   */
  updated_by: string
}
