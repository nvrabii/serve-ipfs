import { expect } from 'chai'
import setIpfsRoot from '../../src/middleware/setIpfsRoot.js'
import { ResMock, ReqMock } from '../mocks/index.js'

const IPFS_ROOT_PATH = '/ipns/rootpath'
const URLS_AT_ROOT = ['/', '/home', '/home/', '/smth/ipfs/etc', '/index.html']
const EXPECTED_URLS_AT_ROOT = ['/index.html', '/home', '/home/', '/smth/ipfs/etc', '/index.html']
const IPFS_PATHS = [
  '/ipfs/something',
  '/ipfs/something/',
  '/ipns/something',
  '/ipns/something/index.html'
]
const EXPECTED_IPFS_ROOTS = [
  '/ipfs/something',
  '/ipfs/something',
  '/ipns/something',
  '/ipns/something'
]
const EXPECTED_IPFS_URLS = ['', '/', '', '/index.html']

describe('setIpfsRoot middleware', () => {
  before(() => {
    process.env.IPFS_ROOT_PATH = IPFS_ROOT_PATH
  })

  it(`changes url '/' to '/index.html'`, () => {
    let reqMock = new ReqMock({ url: '/' })
    let resMock = new ResMock()

    setIpfsRoot(reqMock, resMock, () => {})

    expect(reqMock.url).equals('/index.html')
  })

  URLS_AT_ROOT.forEach((url, index) => {
    it(`sets proper ipfsRoot and url for non-IPFS path (${url})`, () => {
      let reqMock = new ReqMock({ url })
      let resMock = new ResMock()

      setIpfsRoot(reqMock, resMock, () => {})

      expect(resMock.locals.ipfsRoot).equals(IPFS_ROOT_PATH)
      expect(reqMock.url).equals(EXPECTED_URLS_AT_ROOT[index])
    })
  })

  IPFS_PATHS.forEach((url, index) => {
    it(`sets proper ipfsRoot and url when IPFS path (${url})`, () => {
      let reqMock = new ReqMock({ url })
      let resMock = new ResMock()

      setIpfsRoot(reqMock, resMock, () => {})

      expect(resMock.locals.ipfsRoot).equals(EXPECTED_IPFS_ROOTS[index])
      expect(reqMock.url).equals(EXPECTED_IPFS_URLS[index])
    })
  })
})
