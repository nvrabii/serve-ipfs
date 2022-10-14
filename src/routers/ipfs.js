import express from 'express'
import { getIpfsFileHandler } from '../handlers/index.js'
import { connectToIpfs, setIpfsRoot, beforeGet, afterGet } from '../middleware/index.js'

const router = express.Router()

const handlersChain = [beforeGet, connectToIpfs, setIpfsRoot, getIpfsFileHandler, afterGet]

router.get('/ipfs', ...handlersChain)
router.get('/ipns', ...handlersChain)

export default router
