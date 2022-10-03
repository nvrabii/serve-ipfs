import { info } from '../utils/console.js'

function beforeGet(req, _, next) {
  info('GET', req.url)
  next()
}

export default beforeGet
