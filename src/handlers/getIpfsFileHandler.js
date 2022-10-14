import all from 'it-all'
import { extract } from 'it-tar'
import { pipe } from 'it-pipe'
import { concat as uint8ArrayConcat } from 'uint8arrays/concat'
import * as fs from 'fs'

import { err, warn } from '../utils/console.js'
import NotFoundError from '../errors/NotFoundError.js'

const DEFAULT_PATH = '/index.html'

/**
 * @param {IPFSHTTPClient} res.locals.ipfs
 * @param {boolean} res.locals.retryDefault
 * @param {string} res.locals.ipfsRoot
 */
async function getIpfsFileHandler(req, res, next) {
  const { ipfs, ipfsRoot, retryDefault } = res.locals
  let path = req.url
  let data

  try {
    data = await getIpfsFile(ipfs, ipfsRoot + path)
  } catch (_) {
    const prefix = ipfsRoot === process.env.IPFS_ROOT_PATH ? '[root]' : ipfsRoot

    if (!retryDefault || path === DEFAULT_PATH) {
      return next(new NotFoundError(prefix + path))
    }

    warn('GET', `${path} not found, redirected to ${DEFAULT_PATH}`)

    const oldPath = path
    path = DEFAULT_PATH

    try {
      data = await getIpfsFile(ipfs, ipfsRoot + path)
    } catch (e) {
      err('getIpfsFile()', e.message)
      return next(new NotFoundError(prefix + oldPath))
    }
  }

  res.locals.data = data
  res.locals.path = path

  next()
}

async function getIpfsFile(ipfs, ipfsPath) {
  if (process.env.NODE_ENV === 'test') {
    return fs.readFileSync(ipfsPath).toLocaleString()
  } else {
    return uint8ArrayConcat(await pipe(ipfs.get(ipfsPath), extract(), extractTarball))
  }
}

async function extractTarball(source) {
  for await (const { header, body } of source) {
    if (header.type !== 'file') throw new Error(`Unsupported tar entry type ${header.type}`)
    return await all(body)
  }
}

export default getIpfsFileHandler
