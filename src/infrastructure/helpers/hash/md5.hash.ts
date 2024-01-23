import { createHash } from 'crypto'

/**
 * converts the data to md5 hash
 * @param data
 * @returns {string}
 */
export const convertToMd5 = (data: string) => {
  const hash = createHash('md5')
  hash.update(data)
  return hash.digest('hex')
}
