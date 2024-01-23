/**
 * @export
 * @interface DummyPostReq
 */
export type DummyPostReq = {
  /**
   *
   * @type {string}
   * @memberof DummyPostRes
   */
  name: string
  /**
   *
   * @type {string}
   * @memberof DummyPostRes
   */
  email: string
  /**
   *
   * @type {string}
   * @memberof DummyPostRes
   */
  description?: string
}

/**
 * Check if a given object implements the DummyPostRes interface.
 */
export function instanceOfDummyPostRes(value: object): boolean {
  let isInstance = true
  isInstance = isInstance && 'name' in value
  isInstance = isInstance && 'email' in value

  return isInstance
}

export function DummyPostResFromJSON(json: any): DummyPostReq {
  return DummyPostResFromJSONTyped(json)
}

export function DummyPostResFromJSONTyped(json: any): DummyPostReq {
  if (json === undefined || json === null) {
    return json
  }
  return {
    name: json['name'],
    email: json['email'],
    description: json['description'] ? undefined : json['description'],
  }
}

export function DummyPostResToJSON(value?: DummyPostReq | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    name: value.name,
    email: value.email,
    description: value.description,
  }
}
