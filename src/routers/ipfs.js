import express from 'express'
import { info } from '../utils/console.js'

const router = express.Router()

router.get('/ipfs', getHandlerFor('/ipfs'))
router.get('/ipns', getHandlerFor('/ipns'))

function getHandlerFor(prefix) {
  return (req, res) => {
    info('GET', prefix + req.url)
    res.redirect('localhost:8080' + prefix + req.url)
  }
}

export default router
