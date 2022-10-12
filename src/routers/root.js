import express from 'express'
import { getIpfsFileHandler } from '../handlers/index.js'
import {
  afterGet,
  beforeGet,
  connectToIpfs,
  setIpfsRoot,
  setRetryDefault
} from '../middleware/index.js'

const router = express.Router()

router.get(
  '*',
  beforeGet,
  connectToIpfs,
  setIpfsRoot,
  setRetryDefault,
  getIpfsFileHandler,
  afterGet
)

export default router
