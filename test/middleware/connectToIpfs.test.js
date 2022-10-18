import { expect } from 'chai'

import { ResMock } from '../mocks/index.js'
import { IPFSHTTPClient } from '../mocks/ipfsHttpClient.js'

import { IpfsClientOfflineError } from '../../src/errors/index.js'
import { connectToIpfs } from '../../src/middleware/index.js'

describe('connectToIpfs middleware', () => {
  const next = (x) => x

  it('returns an IpfsClientOfflienError on error', async () => {
    const resMock = new ResMock()
    process.env.IPFS_HTTP_CLIENT_ONLINE = false

    const out = await connectToIpfs({}, resMock, next)

    expect(out).instanceOf(IpfsClientOfflineError)
  })

  it('sets res.locals.ipfs on success', async () => {
    const resMock = new ResMock()
    process.env.IPFS_HTTP_CLIENT_ONLINE = true

    await connectToIpfs({}, resMock, next)

    expect(resMock.locals.ipfs).instanceOf(IPFSHTTPClient)
  })
})
