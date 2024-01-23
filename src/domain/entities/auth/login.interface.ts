import Login from '../../../infrastructure/orm/sequelize/entities/t_login'
import { IdAndCreateAndUpdateAtBy } from '../common/db-fields.interface'

/**
 * @export
 * @interface LoginPostReq
 */
export interface LoginPostReq {
  /**
   *
   * @type {string}
   * @memberof LoginPostReq
   */
  phone_number: string
  /**
   *
   * @type {string}
   * @memberof LoginPostReq
   */
  password: string
  /**
   *
   * @type {string}
   * @memberof LoginPostReq
   */
  device_id: string
  /**
   *
   * @type {string}
   * @memberof LoginPostReq
   */
  device_token?: string
  /**
   *
   * @type {string}
   * @memberof LoginPostReq
   */
  os?: string
}

export interface LoginTokenDetails {
  /**
   *
   * @type {number}
   * @memberof LoginTokenDetails
   */
  id: number
  /**
   *
   * @type {string}
   * @memberof LoginTokenDetails
   */
  phone_number: string
  /**
   *
   * @type {enum('user','admin','super_admin')}
   * @memberof LoginTokenDetails
   */
  role: string
}

export function LoginPostReqFromJSON(json: any): LoginPostReq {
  return LoginPostReqFromJSONTyped(json)
}

export type loginRes = {
  refresh_token: string
  access_token: string
}

export function LoginPostReqFromJSONTyped(json: any): LoginPostReq {
  if (json === undefined || json === null) {
    return json
  }
  return {
    phone_number: json['phone_number'],
    password: json['password'],
    device_id: json['device_id'],
    device_token: json['device_token'],
    os: json['os'],
  }
}

export function LoginTokenDetailsFromJSON(json: any): LoginTokenDetails {
  if (json === undefined || json === null) {
    return json
  }
  return {
    id: json['id'],
    phone_number: json['phone_number'],
    role: json['role'],
  }
}

export type FindLoginReq = {
  user_id: number
  device_id: string
  refresh_token?: string
}

export type LoginDetails = Pick<
  Login,
  'user_id' | 'device_id' | 'refresh_token' | 'is_active'
> &
  IdAndCreateAndUpdateAtBy<Login> & {
    os?: Login['os']
    device_token?: Login['device_token']
  }
