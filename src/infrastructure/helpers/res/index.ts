import { NextFunction, Request, Response } from 'express'
import * as E from 'fp-ts/Either'

import { HttpError } from '../../configs/commonDomains/HttpError'
import {
  ApplicationError,
  SuccessTag,
} from '../../configs/constants/application-tag'
import { StatusCodes } from '../../configs/constants/statusCodes'
import logger from '../logger'

type HttpSuccessResponse = {
  message?: string
  data?: any
}

type HttpErrorResponse = {
  message?: string
  errorData?: string | object
}

/**
 * Function  Response error
 * @param error error object
 * @param req Express request
 * @param res Express response
 */
export function errorResponse(
  error: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const apiError: HttpErrorResponse = {
    message: req.__('INTERNAL_SERVER_ERROR'),
  }
  if (error instanceof HttpError) {
    if (error.custom) {
      res.status(error.statusCode).send(error.errorData)
      next()
      return
    }
    apiError.message = req.__(error.message, error.field!)
    apiError.errorData = error.errorData
    res.status(error.statusCode).send(apiError)
  } else {
    logger.error(`[${new Date().toISOString()}]`, error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: req.__('INTERNAL_SERVER_ERROR'),
    })
  }
  next()
}

export function successResponse(
  _req: Request,
  res: Response,
  statusCode: StatusCodes,
  message: string,
  data?: any,
): void {
  const response: HttpSuccessResponse = {}

  if (data) {
    response.message = message
    response.data = data
  } else {
    response.message = message
  }

  res.status(statusCode).json(response)
  return
}

export const formatError = (
  statusCode: number,
  tag: string,
  field?: { [key: string]: any },
  errorData?: any,
  custom?: boolean,
) => {
  const error = new HttpError({
    statusCode,
    message: {
      tag,
      field,
    },
    errorData,
    custom,
  })
  return error
}

export const handleResult = <D>(
  req: Request,
  res: Response,
  next: NextFunction,
  statusCode: StatusCodes,
  tag: SuccessTag,
  data: E.Either<ApplicationError, D>,
): void => {
  if (E.isRight(data)) {
    successResponse(req, res, statusCode, req.__(tag), data.right)
  } else {
    next(data.left)
  }
}
