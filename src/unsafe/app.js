import express from 'express'
import { info } from '../utils/console.js'

const app = express()

app.get('*', (req, res) => {
  info('HTTP -> HTTPS', 'redirected request')
  res.redirect('https://' + req.hostname + req.url)
})

export default app
