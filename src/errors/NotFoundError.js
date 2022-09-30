class NotFoundError extends Error {
  code = 404

  constructor(pathname) {
    super(`File ${pathname} not found`)
  }
}

export default NotFoundError
