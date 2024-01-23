import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'

import { CONSTANTS } from '../../configs/constants/constants'
import { StatusCodes } from '../../configs/constants/statusCodes'
import { formatError } from '../res'

export const validation = (
  schema: any,
  from?: 'body' | 'query' | 'params' | 'formData',
) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    let data
    switch (from) {
      case 'body':
        data = _.assign(req.body)
        break

      case 'query':
        data = _.assign(req.query)
        break

      case 'params':
        data = _.assign(req.params)
        break
      case 'formData':
        {
          const paramsData = { ...req.body }
          if (req.file) {
            paramsData[req.file.fieldname] = req.file
          }
          data = _.assign(paramsData)
        }
        break
      default:
        {
          const paramsData = { ...req.query, ...req.params }
          data = _.assign(req.body, paramsData)
        }
        break
    }
    const is_valid = schema.validate(data)
    if (is_valid.error) {
      const tag = is_valid.error.details[0].type
        .split('.')
        .join('_')
        .toUpperCase()
      const number =
        is_valid.error.details[0].context?.limit ||
        is_valid.error.details[0].context.valids
      const error = formatError(StatusCodes.BAD_REQUEST, tag, {
        field: is_valid.error.details[0].path[0],
        number,
      })
      next(error)
    } else {
      next()
    }
  }
}

export const orderByValidationRegExp = (validOrderFields: string[]) => {
  return new RegExp(
    `^(${validOrderFields.join(
      '|',
    )}) \\| (${CONSTANTS.VALIDATION.ORDER_DIRECTIONS.join('|')})$`,
  )
}
