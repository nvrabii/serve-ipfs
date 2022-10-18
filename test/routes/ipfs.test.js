import chai from 'chai'
import { expect } from 'chai'
import chaiHTTP from 'chai-http'
import * as fs from 'fs'

import app from '../../src/app.js'

const IPFS_ROOT = './test/mocks/data'
const VALID_PATHS = [
  '/ipfs/somecid/index.json',
  '/ipfs/somecid/dir/',
  '/ipfs/somecid/dir/index.html'
]
const VALID_PATHS_EXPECTED = [
  '/ipfs/somecid/index.json',
  '/ipfs/somecid/dir/index.html',
  '/ipfs/somecid/dir/index.json'
]
const INVALID_PATHS = ['/ipfs/somecid', '/ipfs/somecid/']

chai.use(chaiHTTP)

describe('/ipfs/ | /ipns/ routes', () => {
  let server

  before(() => {
    process.env.IPFS_ROOT_PATH = IPFS_ROOT
    process.env.FORCE_IPFS_ROOT_PATH = true
    server = app.listen(80)
  })

  after(() => {
    server.close()
    process.env.FORCE_IPFS_ROOT_PATH = false
  })

  VALID_PATHS.forEach((path, index) => {
    it(`should GET ${VALID_PATHS_EXPECTED[index]} from ${path}`, () => {
      chai
        .request(app)
        .get(path)
        .end((err, res) => {
          expect(err).is.null
          expect(res.status).equal(200)
          const data = fs.readFileSync(IPFS_ROOT + VALID_PATHS_EXPECTED[index]).toLocaleString()
          expect(res.text).equals(data)
        })
        .timeout(1000)
    })
  })

  INVALID_PATHS.forEach((path) => {
    it(`should not GET ${path}`, () => {
      chai
        .request(server)
        .get(path)
        .end((err, res) => {
          expect(err).is.null
          expect(res.status).equal(404)
          expect(res.text).equals(`File ${path} not found`)
        })
        .timeout(1000)
    })
  })
})
