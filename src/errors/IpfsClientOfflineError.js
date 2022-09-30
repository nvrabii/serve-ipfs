class IpfsClientOfflineError extends Error {
  code = 503

  constructor() {
    super('IPFS client is offline')
  }
}

export default IpfsClientOfflineError
