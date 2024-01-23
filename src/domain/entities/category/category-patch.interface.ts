/**
 *
 * @export
 * @interface CategoryPatchReq
 */
export interface CategoryPatchReq {
  /**
   *
   * @type {number}
   * @memberof CategoryPatchReq
   */
  id: number
  /**
   *
   * @type {string}
   * @memberof CategoryPatchReq
   */
  name?: string
  /**
   *
   * @type {number}
   * @memberof CategoryPatchReq
   */
  parent_id: number
  /**
   *
   * @type {string}
   * @memberof CategoryPatchReq
   */
  img_url?: string
  /**
   *
   * @type {Express.Multer.File}
   * @memberof CategoryPostRes
   */
  image?: Express.Multer.File
  /**
   *
   * @type {Date}
   * @memberof CategoryPatchReq
   */
  updated_at?: Date
}
