import Review from '../../../infrastructure/orm/sequelize/entities/t_review'

/**
 *
 * @export
 * @interface ReviewData
 */
export interface ReviewData {
  /**
   * @type {number}
   * @memberof ReviewData
   */
  reviewer_id: number
  /**
   * @type {number}
   * @memberof ReviewData
   */
  reviewed_id: number
  /**
   * @type {number}
   * @memberof ReviewData
   */
  rating: number
  /**
   * @type {string}
   * @memberof ReviewData
   */
  comment: string
  /**
   * @type {boolean}
   * @memberof ReviewData
   */
  is_active?: boolean
  /**
   * @type {Date}
   * @memberof ReviewData
   */
  created_at: Date
  /**
   * @type {Date}
   * @memberof ReviewData
   */
  updated_at: Date
}

export interface ReviewGetRes {
  totalRecord: number
  data: ReviewData[]
}

export type ReviewGetDB = Pick<
  Review,
  | 'reviewer_id'
  | 'reviewed_id'
  | 'rating'
  | 'comment'
  | 'created_at'
  | 'updated_at'
  | 'is_active'
>

export function ReviewDataFromJSON(json: any): ReviewData {
  return ReviewDataFromJSONTyped(json)
}

export function ReviewDataFromJSONTyped(json: any): ReviewData {
  if (json === undefined || json === null) {
    return json
  }
  return {
    reviewer_id: json['reviewer_id'],
    reviewed_id: json['reviewed_id'],
    comment: json['comment'],
    rating: json['rating'],
    is_active: !json['is_active'] ? undefined : json['is_active'],
    created_at: !json['created_at'] ? undefined : json['created_at'],
    updated_at: !json['updated_at'] ? undefined : json['updated_at'],
  }
}
