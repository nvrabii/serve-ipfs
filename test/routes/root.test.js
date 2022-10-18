import chai from 'chai'
import { expect } from 'chai'
import chaiHttp from 'chai-http'
import fs from 'fs'

import app from '../../src/app.js'

const IPFS_ROOT = './test/mocks/data'
const VALID_PATHS = ['/index.json', '/ok/index.html']
const VALID_PATHS_EXPECTED = ['/index.json', '/ok/index.html']
const INVALID_PATHS = ['/', '/home']
const INVALID_PATHS_EXPECTED = ['/index.html', '/home']

chai.use(chaiHttp)

describe('/ route', () => {
  let requester

  before(() => {
    process.env.IPFS_ROOT_PATH = IPFS_ROOT
    process.env.IPFS_HTTP_CLIENT_ONLINE = true

    requester = chai.request(app).keepOpen()
  })

  after(() => {
    requester.close()
    process.env.IPFS_HTTP_CLIENT_ONLINE = false
  })

  VALID_PATHS.forEach((path, index) => {
    it(`should GET ${VALID_PATHS_EXPECTED[index]} from ${path}`, (done) => {
      requester.get(path).end((err, res) => {
        expect(err).is.null
        expect(res.status).equal(200)
        const data = fs.readFileSync(IPFS_ROOT + VALID_PATHS_EXPECTED[index]).toLocaleString()
        expect(res.text).equals(data)
        done()
      })
    })
  })

  INVALID_PATHS.forEach((path, index) => {
    it(`should not GET ${INVALID_PATHS_EXPECTED[index]} from ${path}`, (done) => {
      requester.get(path).end((err, res) => {
        expect(err).is.null
        expect(res.status).equal(404)
        expect(res.text).equals(`File [root]${INVALID_PATHS_EXPECTED[index]} not found`)
        done()
      })
    })
  })
})
