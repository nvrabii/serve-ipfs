function setIpfsRoot(req, res, next) {
  const path = req.url.split('/')

  if (path[1] === 'ipfs' || path[1] === 'ipns') {
    res.locals.ipfsRoot = `/${path.slice(1, 3).join('/')}`
    req.url = req.url.slice(res.locals.ipfsRoot.length)
  } else {
    res.locals.ipfsRoot = process.env.IPFS_ROOT_PATH
  }

  req.url = req.url === '/' ? '/index.html' : req.url
  next()
}

export default setIpfsRoot
