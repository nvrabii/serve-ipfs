import all from 'it-all'
import { extract } from 'it-tar'
import { pipe } from 'it-pipe'
import { concat as uint8ArrayConcat } from 'uint8arrays/concat'

import { err, warn } from '../utils/console.js'
import NotFoundError from '../errors/NotFoundError.js'

const DEFAULT_PATH = '/index.html'

/**
 *
 * @param {IpfsHttpClient} res.locals.ipfs - IpfsHttpClient instance
 * @param {string} res.locals.ipfsRoot - IPFS path to the required file
 * @param {boolean} res.locals.retryDefault - redirect request to default path `/index.html` if file not found
 */
async function getIpfsFile(req, res, next) {
  const { ipfs, ipfsRoot, retryDefault } = res.locals
  let path = req.url
  let data

  try {
    data = await handleGetIpfsFile(ipfs, ipfsRoot + path)
  } catch (_) {
    if (!retryDefault) return next(e)
    if (path === DEFAULT_PATH) return next(new NotFoundError(path))

    warn('GET', `${path} not found, redirected to ${DEFAULT_PATH}`)

    path = DEFAULT_PATH

    try {
      data = await handleGetIpfsFile(ipfs, ipfsRoot + path)
    } catch (e) {
      err('getIpfsFile()', e.message)
      return next(e)
    }
  }

  res.locals.data = data
  res.locals.path = path

  next()
}

async function handleGetIpfsFile(ipfs, ipfsPath) {
  return uint8ArrayConcat(await pipe(ipfs.get(ipfsPath), extract(), extractTarball))
}

async function extractTarball(source) {
  for await (const { header, body } of source) {
    if (header.type !== 'file') throw new Error(`Unsupported tar entry type ${header.type}`)
    return await all(body)
  }
}

export default getIpfsFile
