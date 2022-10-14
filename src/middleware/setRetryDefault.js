function setRetryDefault(_, res, next) {
  res.locals.retryDefault = true

  next()
}

export default setRetryDefault
