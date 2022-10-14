import express from 'express'
import { info } from '../utils/console.js'

const router = express.Router()

router.get('/ipfs/*', redirectToIpfsHandler)
router.get('/ipns/*', redirectToIpfsHandler)

function redirectToIpfsHandler(req, res) {
  info('GET', req.url)

  const connection = req.secure ? 'https://' : 'https://'

  res.redirect(connection + req.headers.host + ':8080' + req.url)
}

export default router
