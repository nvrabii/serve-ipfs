import express from 'express'
import { getIpfsFile } from '../handlers/index.js'
import { connectToIpfs, setIpfsRoot, beforeGet, afterGet } from '../middleware/index.js'

const router = express.Router()

router.get('/ipfs/', beforeGet, connectToIpfs, setIpfsRoot, getIpfsFile, afterGet)
router.get('/ipns/', beforeGet, connectToIpfs, setIpfsRoot, getIpfsFile, afterGet)

export default router
