import chai from 'chai'
import { expect } from 'chai'
import chaiHttp from 'chai-http'
import fs from 'fs'

import app from '../../src/app.js'

const IPFS_ROOT = './test/mocks/data'
const VALID_PATHS = ['/ipfs/somecid/index.json', '/ipfs/somecid/dir/index.html']
const VALID_PATHS_EXPECTED = ['/ipfs/somecid/index.json', '/ipfs/somecid/dir/index.html']
const INVALID_PATHS = ['/ipfs/somecid/', '/ipfs/somecid/dir/', '/ipfs/somecid/dir/index.json']

chai.use(chaiHttp)

describe('/ipfs/ | /ipns/ routes', () => {
  let requester

  before(() => {
    process.env.IPFS_ROOT_PATH = IPFS_ROOT
    process.env.OVERRIDE_IPFS_ROOT = true
    process.env.IPFS_HTTP_CLIENT_ONLINE = true

    requester = chai.request(app).keepOpen()
  })

  after(() => {
    requester.close()
    process.env.OVERRIDE_IPFS_ROOT = false
    process.env.IPFS_HTTP_CLIENT_ONLINE = false
  })

  VALID_PATHS.forEach((path, index) => {
    it(`should GET ${VALID_PATHS_EXPECTED[index]} from ${path}`, (done) => {
      requester.get(path).end((err, res) => {
        expect(err).to.be.null
        expect(res.status).equal(200)
        const data = fs.readFileSync(IPFS_ROOT + VALID_PATHS_EXPECTED[index]).toLocaleString()
        expect(res.text).equals(data)
        done()
      })
    })
  })

  INVALID_PATHS.forEach((path) => {
    it(`should not GET ${path}`, (done) => {
      requester.get(path).end((err, res) => {
        expect(err).is.null
        expect(res.status).equal(404)
        expect(res.text).equals(`File ${path} not found`)
        done()
      })
    })
  })
})
