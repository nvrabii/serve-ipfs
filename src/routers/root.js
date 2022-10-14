import express from 'express'
import { getIpfsFileHandler } from '../handlers/index.js'
import {
  afterGet,
  beforeGet,
  connectToIpfs,
  setRetryDefault,
  setIpfsRoot
} from '../middleware/index.js'

const router = express.Router()

router.get(
  '*',
  beforeGet,
  setIpfsRoot,
  setRetryDefault,
  connectToIpfs,
  getIpfsFileHandler,
  afterGet
)

export default router
