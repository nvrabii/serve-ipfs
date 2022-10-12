import express from 'express'
import { getIpfsFileHandler } from '../handlers/index.js'
import { afterGet, beforeGet, connectToIpfs } from '../middleware/index.js'

const router = express.Router()

router.get('*', beforeGet, connectToIpfs, getIpfsFileHandler, afterGet)

export default router
