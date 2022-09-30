function setIpfsRoot(req, res, next) {
  req.url = req.url === '/' ? '/index.html' : req.url
  res.locals.ipfsRoot = process.env.IPFS_ROOT_PATH

  next()
}

export default setIpfsRoot
