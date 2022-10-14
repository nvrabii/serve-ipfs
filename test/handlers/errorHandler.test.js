import { expect } from 'chai'
import { ResMock } from '../mocks/index.js'

import errorHandler from '../../src/handlers/errorHandler.js'
import { NotFoundError, IpfsClientOfflineError } from '../../src/errors/index.js'

describe('errorHandler', () => {
  let resMock
  const next = (x) => x

  beforeEach(() => {
    resMock = new ResMock()
  })

  it('forwards err to express if headersSent', () => {
    resMock.headersSent = true
    const err = new Error()

    const out = errorHandler(err, {}, resMock, next)

    expect(out).equals(err)
  })

  it('returns 500 "Internal Server Error" by default', () => {
    const err = new Error()

    errorHandler(err, {}, resMock, next)

    expect(resMock._status).equals(500)
    expect(resMock.data).equals('Internal Server Error')
  })

  it('returns proper status and message on NotFoundError', () => {
    const err = new NotFoundError()

    errorHandler(err, {}, resMock, next)

    expect(resMock._status).equals(404)
    expect(resMock.data).equals('File not found')
  })

  it('returns proper status and message on NotFoundError with path', () => {
    const pathname = '/index.html'
    const err = new NotFoundError(pathname)

    errorHandler(err, {}, resMock, next)

    expect(resMock._status).equals(404)
    expect(resMock.data).equals(`File ${pathname} not found`)
  })

  it('returns proper status and message on IpfsClientOfflineError', () => {
    const err = new IpfsClientOfflineError()

    errorHandler(err, {}, resMock, next)

    expect(resMock._status).equals(503)
    expect(resMock.data).equals('Service Unavailable')
  })
})
