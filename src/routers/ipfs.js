import express from 'express'
import { getIpfsFileHandler } from '../handlers/index.js'
import { afterGet, beforeGet, connectToIpfs, setIpfsRoot } from '../middleware/index.js'

const router = express.Router()

const handlers = [beforeGet, setIpfsRoot, connectToIpfs, getIpfsFileHandler, afterGet]

router.get('/ipfs/*', handlers)
router.get('/ipns/*', handlers)

export default router
