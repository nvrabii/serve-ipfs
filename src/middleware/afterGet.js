import { success } from '../utils/console.js'
import * as mime from 'mime-types'

function afterGet(_, res) {
  const { path, data } = res.locals

  success('GET', path)

  res.setHeader('Content-type', mime.lookup(path))
  res.status(200)
  res.end(data)
}

export default afterGet
