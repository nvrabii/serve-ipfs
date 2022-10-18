import chai from 'chai'
import { expect } from 'chai'
import chaiHTTP from 'chai-http'
import * as fs from 'fs'

import app from '../../src/app.js'

const IPFS_ROOT = './test/mocks/data'
const VALID_PATHS = ['/index.json', '/ok/index.html']
const VALID_PATHS_EXPECTED = ['/index.json', '/ok/index.html']
const INVALID_PATHS = ['/', '/home']
const INVALID_PATHS_EXPECTED = ['/index.html', '/home']

chai.use(chaiHTTP)

describe('/ routes', () => {
  let server

  before(() => {
    process.env.IPFS_ROOT_PATH = IPFS_ROOT
    server = app.listen(80)
  })

  after(() => {
    server.close()
  })

  VALID_PATHS.forEach((path, index) => {
    it(`should GET ${VALID_PATHS_EXPECTED[index]} from ${path}`, () => {
      chai
        .request(server)
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

  INVALID_PATHS.forEach((path, index) => {
    it(`should not GET ${INVALID_PATHS_EXPECTED[index]} from ${path}`, () => {
      chai
        .request(server)
        .get(path)
        .end((err, res) => {
          expect(err).is.null
          expect(res.status).equal(404)
          expect(res.text).equals(`File [root]${INVALID_PATHS_EXPECTED[index]} not found`)
        })
        .timeout(1000)
    })
  })
})
