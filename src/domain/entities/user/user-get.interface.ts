import User from '../../../infrastructure/orm/sequelize/entities/m_user'

/**
 * @export
 * @interface UserGetRes
 */

/**
 * @export
 * @interface UserGetResDataInner
 */
export interface UserGetResDataInner {
  /**
   *
   * @type {number}
   * @memberof UserGetResDataInner
   */
  id: number
  /**
   *
   * @type {string}
   * @memberof UserGetResDataInner
   */
  name: string
  /**
   *
   * @type {string}
   * @memberof UserGetResDataInner
   */
  phoneNumber: string
  /**
   *
   * @type {string}
   * @memberof UserGetResDataInner
   */
  email: string
  /**
   *
   * @type {string}
   * @memberof UserGetResDataInner
   */
  role: UserGetResDataInnerRoleEnum
  /**
   *
   * @type {boolean}
   * @memberof UserGetResDataInner
   */
  isActive: boolean
  /**
   *
   * @type {Date}
   * @memberof UserGetResDataInner
   */
  createdAt: Date
  /**
   *
   * @type {string}
   * @memberof UserGetResDataInner
   */
  createdBy: string
  /**
   *
   * @type {Date}
   * @memberof UserGetResDataInner
   */
  updatedAt: Date
  /**
   *
   * @type {string}
   * @memberof UserGetResDataInner
   */
  updatedBy: string
}

export type UserGetDB = Pick<
  User,
  | 'id'
  | 'name'
  | 'phone_number'
  | 'email'
  | 'role'
  | 'is_active'
  | 'created_at'
  | 'updated_at'
>

/**
 * @export
 */
export const UserGetResDataInnerRoleEnum = {
  User: 'user',
  Admin: 'admin',
  SuperAdmin: 'super_admin',
} as const
export type UserGetResDataInnerRoleEnum =
  (typeof UserGetResDataInnerRoleEnum)[keyof typeof UserGetResDataInnerRoleEnum]

export function UserGetResDataInnerFromJSON(json: any): UserGetResDataInner {
  return UserGetResDataInnerFromJSONTyped(json)
}

export function UserGetResDataInnerFromJSONTyped(
  json: any,
): UserGetResDataInner {
  if (json === undefined || json === null) {
    return json
  }
  return {
    id: json['id'],
    name: json['name'],
    phoneNumber: json['phone_number'],
    email: json['email'],
    role: json['role'],
    isActive: json['is_active'],
    createdAt: new Date(json['created_at']),
    createdBy: json['created_by'],
    updatedAt: new Date(json['updated_at']),
    updatedBy: json['updated_by'],
  }
}

export interface UserGetRes {
  /**
   *
   * @type {number}
   * @memberof UserGetRes
   */
  totalCount: number
  /**
   *
   * @type {Array<UserGetResDataInner>}
   * @memberof UserGetRes
   */
  data: Array<UserGetResDataInner>
}
