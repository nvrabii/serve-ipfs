const ipfsHttpClient =
  process.env.NODE_ENV === 'test'
    ? await import('../../test/mocks/ipfsHttpClient.js')
    : await import('ipfs-http-client')

import { IpfsClientOfflineError } from '../errors/index.js'
import { info } from '../utils/console.js'

const connectToIpfs = async (_, res, next) => {
  const ipfs = ipfsHttpClient.create(process.env.IPFS_API)

  try {
    if (!(await ipfs.isOnline())) throw new Error()
  } catch (_) {
    return next(new IpfsClientOfflineError())
  }

  res.locals.ipfs = ipfs

  info('Info', 'Successfully connected to the IPFS client')

  next()
}

export default connectToIpfs
