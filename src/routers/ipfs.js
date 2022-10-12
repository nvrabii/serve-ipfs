import express from 'express'
import { info } from '../utils/console.js'

const router = express.Router()

router.get('/ipfs/*', redirectToIpfsHandler)
router.get('/ipns/*', redirectToIpfsHandler)

function redirectToIpfsHandler(req, res) {
  info('GET', req.url)
  res.redirect('http://localhost:8080' + req.url)
}

export default router
