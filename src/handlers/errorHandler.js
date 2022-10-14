import { IpfsClientOfflineError, NotFoundError } from '../errors/index.js'

import { err as error } from '../utils/console.js'

function errorHandler(err, _, res, next) {
  if (res.headersSent) return next(err)

  let errorCode = 500
  let errorMessage = 'Internal Server Error'

  if (err instanceof NotFoundError) {
    errorCode = err.code
    errorMessage = err.message
  } else if (err instanceof IpfsClientOfflineError) {
    errorCode = err.code
    errorMessage = 'Service Unavailable'
  }

  error(errorCode, errorMessage)

  res.status(errorCode).end(errorMessage)
}

export default errorHandler
