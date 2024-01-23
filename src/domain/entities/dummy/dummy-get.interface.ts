import Dummy from '../../../infrastructure/orm/sequelize/entities/t_dummy'

/**
 * @export
 * @interface DummyGetRes
 */
export interface DummyGet {
  /**
   *
   * @type {number}
   * @memberof DummyGetRes
   */
  id: number
  /**
   *
   * @type {string}
   * @memberof DummyGetRes
   */
  name: string
  /**
   *
   * @type {string}
   * @memberof DummyGetRes
   */
  email: string
  /**
   *
   * @type {string}
   * @memberof DummyGetRes
   */
  description?: string

  /**
   *
   * @type {Date}
   * @memberof DummyGetRes
   */
  created_at?: string

  /**
   *
   * @type {Date}
   * @memberof DummyGetRes
   */
  updated_at?: string
}

export interface DummyGetRes {
  totalRecord: number
  data: DummyGet[]
}

/**
 * Check if a given object implements the DummyGetRes interface.
 */
export function instanceOfDummyGetRes(value: object): boolean {
  let isInstance = true
  isInstance = isInstance && 'id' in value
  isInstance = isInstance && 'name' in value
  isInstance = isInstance && 'email' in value

  return isInstance
}

export function dummyGetResFromJSON(json: any): DummyGet {
  return dummyGetResFromJSONTyped(json)
}

export type DummyGetDB = Pick<
  Dummy,
  'id' | 'name' | 'description' | 'created_at' | 'updated_at'
>

export function dummyGetResFromJSONTyped(json: any): DummyGet {
  if (json === undefined || json === null) {
    return json
  }
  return {
    id: json['id'],
    name: json['name'],
    email: json['email'],
    description: !json['description'] ? undefined : json['description'],
    created_at: !json['created_at'] ? undefined : json['created_at'],
    updated_at: !json['updated_at'] ? undefined : json['updated_at'],
  }
}
