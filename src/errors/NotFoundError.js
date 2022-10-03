class NotFoundError extends Error {
  code = 404

  constructor(pathname) {
    super(pathname ? `File ${pathname}not found` : 'File not found')
  }
}

export default NotFoundError
