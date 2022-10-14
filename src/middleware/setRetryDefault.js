function setRetryDefault(req, res, next) {
  res.locals.retryDefault = true
  next()
}

export default setRetryDefault
