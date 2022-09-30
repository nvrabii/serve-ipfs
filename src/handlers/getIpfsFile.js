import * as mime from 'mime-types'
import all from 'it-all'
import { extract } from 'it-tar'
import { pipe } from 'it-pipe'
import { concat as uint8ArrayConcat } from 'uint8arrays/concat'

import { info, success, warn } from '../utils/console.js'
import NotFoundError from '../errors/NotFoundError.js'

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
    info('GET', req.url)

    data = await handleGetIpfsFile(ipfs, ipfsRoot + path)
  } catch (_) {
    const defaultPath = '/index.html'

    if (!retryDefault) return next(e)
    if (path === defaultPath) return next(new NotFoundError())

    warn('GET', `${path} not found, redirected to ${defaultPath}`)

    path = defaultPath
    data = await handleGetIpfsFile(ipfs, ipfsRoot + path)
  } finally {
    success('GET', path)

    res.setHeader('Content-type', mime.lookup(path))
    res.status(200).send(data)
  }
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
