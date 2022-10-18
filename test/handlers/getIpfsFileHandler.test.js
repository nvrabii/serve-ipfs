import { expect } from 'chai'
import * as fs from 'fs'
import NotFoundError from '../../src/errors/NotFoundError.js'

import { getIpfsFileHandler } from '../../src/handlers/index.js'
import { ResMock, ReqMock } from '../mocks/index.js'

const IPFS_ROOT = './test/mocks/data'
const IPFS_ROOT_W_DEFAULT = './test/mocks/data/ok'
const VALID_PATH = '/index.json'
const INVALID_PATH = '/index_not.json'
const DEFAULT_PATH = '/index.html'

describe('getIpfsFileHandler', () => {
  const next = (x) => x
  let reqMock
  let resMock

  beforeEach(() => {
    reqMock = new ReqMock()
    resMock = new ResMock()
  })

  it('retrieves data', async () => {
    resMock.locals.ipfsRoot = IPFS_ROOT
    resMock.locals.retryDefault = true
    reqMock.url = VALID_PATH

    await getIpfsFileHandler(reqMock, resMock, next)

    const data = fs.readFileSync(IPFS_ROOT + VALID_PATH).toLocaleString()
    expect(resMock.locals.data.toLocaleString()).equals(data)
    expect(resMock.locals.path).equals(VALID_PATH)
  })

  it('should not retry [root]/', async () => {
    process.env.IPFS_ROOT_PATH = IPFS_ROOT

    resMock.locals.ipfsRoot = IPFS_ROOT
    resMock.locals.retryDefault = true
    reqMock.url = '/'

    const out = await getIpfsFileHandler(reqMock, resMock, next)

    expect(out).instanceOf(NotFoundError)
    expect(out.message).equals('File [root]/ not found')
  })

  it('failes to retrieve data on rootPath', async () => {
    process.env.IPFS_ROOT_PATH = IPFS_ROOT

    resMock.locals.ipfsRoot = IPFS_ROOT
    resMock.locals.retryDefault = false
    reqMock.url = INVALID_PATH

    const out = await getIpfsFileHandler(reqMock, resMock, next)

    expect(out).instanceOf(NotFoundError)
    expect(out.message).equals(`File [root]${INVALID_PATH} not found`)
  })

  it('failes to retrieve data on !rootPath', async () => {
    process.env.IPFS_ROOT_PATH = '/'

    resMock.locals.ipfsRoot = IPFS_ROOT
    resMock.locals.retryDefault = false
    reqMock.url = INVALID_PATH

    const out = await getIpfsFileHandler(reqMock, resMock, next)

    expect(out).instanceOf(NotFoundError)
    expect(out.message).equals(`File ${IPFS_ROOT + INVALID_PATH} not found`)
  })

  it('succeeds on retryDefault', async () => {
    process.env.IPFS_ROOT_PATH = IPFS_ROOT_W_DEFAULT

    resMock.locals.ipfsRoot = IPFS_ROOT_W_DEFAULT
    resMock.locals.retryDefault = true
    reqMock.url = INVALID_PATH

    await getIpfsFileHandler(reqMock, resMock, next)

    const data = fs.readFileSync(IPFS_ROOT_W_DEFAULT + DEFAULT_PATH).toLocaleString()
    expect(resMock.locals.data.toLocaleString()).equals(data)
    expect(resMock.locals.path).equals(DEFAULT_PATH)
  })

  it('fails on retryDefault', async () => {
    process.env.IPFS_ROOT_PATH = IPFS_ROOT

    resMock.locals.ipfsRoot = IPFS_ROOT
    resMock.locals.retryDefault = true
    reqMock.url = INVALID_PATH

    const out = await getIpfsFileHandler(reqMock, resMock, next)

    expect(out).instanceOf(NotFoundError)
    expect(out.message).equals(`File [root]${INVALID_PATH} not found`)
  })
})
