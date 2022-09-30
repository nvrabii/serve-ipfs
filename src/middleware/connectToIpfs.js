import * as ipfsHttpClient from 'ipfs-http-client'

import { IpfsClientOfflineError } from '../errors/index.js'
import { info } from '../utils/console.js'

const connectToIpfs = async (req, res, next) => {
  const ipfs = ipfsHttpClient.create(process.env.IPFS_API)

  try {
    if (!(await ipfs.isOnline())) return next(new IpfsClientOfflineError())
  } catch (_) {
    return next(new IpfsClientOfflineError())
  }

  res.locals.ipfs = ipfs

  info('Info', 'Successfully connected to the IPFS client')

  next()
}

export default connectToIpfs
