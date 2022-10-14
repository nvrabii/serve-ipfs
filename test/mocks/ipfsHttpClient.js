/**
 * Configure `IPFS_HTTP_CLIENT_ONLINE` env variable before use
 */
class IPFSHTTPClient {
  _isOnline = true
  _path = null

  async isOnline() {
    return this._isOnline
  }

  constructor(path) {
    this._path = path
    this._isOnline = process.env.IPFS_HTTP_CLIENT_ONLINE === 'true'
  }
}

function create(path) {
  return new IPFSHTTPClient(path)
}

export { create, IPFSHTTPClient }
