import express from 'express'
import { getIpfsFile } from '../handlers/index.js'
import {
  afterGet,
  beforeGet,
  connectToIpfs,
  setIpfsRoot,
  setRetryDefault
} from '../middleware/index.js'

const router = express.Router()

router.get('*', beforeGet, connectToIpfs, setIpfsRoot, setRetryDefault, getIpfsFile, afterGet)

export default router
