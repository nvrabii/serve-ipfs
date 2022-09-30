import express from 'express'
import { getIpfsFile } from '../handlers/index.js'
import { connectToIpfs, setIpfsRoot, setRetryDefault } from '../middleware/index.js'

const handler = express()

handler.get('*', connectToIpfs, setIpfsRoot, setRetryDefault, getIpfsFile)

export default handler
