import { StatusCodes } from '../constants/statusCodes'

export class HttpError extends Error {
  message = 'INTERNAL_SERVER_ERROR'
  statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR
  field?: { [key: string]: any }
  errorData?: any
  custom?: boolean

  constructor(error: {
    statusCode: number
    message: { tag: string; field?: { [key: string]: any } }
    errorData?: string
    custom?: boolean
  }) {
    super(error.errorData)

    Object.setPrototypeOf(this, new.target.prototype)
    this.message = error.message.tag
    this.field = error.message.field
    this.statusCode = error.statusCode
    this.errorData = error.errorData
    this.custom = error.custom

    Error.captureStackTrace(this)
  }
}
