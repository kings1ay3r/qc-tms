import { NextFunction, Request, Response } from 'express'
import logger from '@app/server/common/logger'

export default (
  error: Error & { statusCode?: number },
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  //TODO: (SanityEnhancements) Translate Prisma error statuses to HTTP statuses
  const status: number = error.statusCode || 500
  const message: string = error.message || 'internal server error, please try again later.'

  process.env.NODE_ENV === 'TEST'
    ? console.info(error.message)
    : process.env.NODE_ENV === 'DEVELOPMENT' || process.env.NODE_ENV === 'DEBUG'
      ? console.log(error)
      : logger.error(
          'errorMiddleware',
          `${req.socket.remoteAddress} ${req.method} ${req.path} ${status}`,
          res.locals,
          {
            path: req.path,
            req: { query: req.query, params: req.params, body: req.body },
            err: error,
          },
        )
  const respMessage = {
    status: 'fail',
    data:
      process.env.NODE_ENV === 'DEVELOPMENT' || process.env.NODE_ENV === 'DEBUG' ? error.stack : {},
    message: message || '',
  }
  res.status(status).json(respMessage)
}
