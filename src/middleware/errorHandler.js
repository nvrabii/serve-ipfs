import { IpfsClientOfflineError, NotFoundError } from '../errors/index.js'

import { err as error } from '../utils/console.js'

function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err)

  let errorCode = 500
  let errorMessage = 'Internal server error'

  if (err instanceof IpfsClientOfflineError || err instanceof NotFoundError) {
    errorCode = err.code
    errorMessage = err.message
  }

  error(errorCode, errorMessage)

  res.status(errorCode).end(errorMessage)
}

export default errorHandler
