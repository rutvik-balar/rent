/**
 *
 * @export
 * @interface CategoryPostRes
 */
export interface CategoryPostReq {
  /**
   *
   * @type {string}
   * @memberof CategoryPostRes
   */
  name: string
  /**
   *
   * @type {number}
   * @memberof CategoryPostRes
   */
  parent_id: number
  /**
   *
   * @type {string}
   * @memberof CategoryPostRes
   */
  img_url?: string
  /**
   *
   * @type {Express.Multer.File}
   * @memberof CategoryPostRes
   */
  image?: Express.Multer.File
}
