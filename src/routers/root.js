import express from 'express'
import { getIpfsFile } from '../handlers/index.js'
import { connectToIpfs, setIpfsRoot, setRetryDefault } from '../middleware/index.js'
import { info, success } from '../utils/console.js'
import * as mime from 'mime-types'

const handler = express.Router()

handler.get(
  '*',
  beforeMiddleware,
  connectToIpfs,
  setIpfsRoot,
  setRetryDefault,
  getIpfsFile,
  afterMiddleware
)

function beforeMiddleware(req, _, next) {
  info('GET', req.url)
  next()
}

function afterMiddleware(_, res) {
  success('GET', path)

  const { path, data } = res.locals
  res.setHeader('Content-type', mime.lookup(path))
  res.status(200)
  res.end(data)
}

export default handler
