import dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'
import http from 'http'
import https from 'https'

import unsafeApp from './src/unsafe/app.js'
import app from './src/app.js'

if (process.env.SSL_KEY && process.env.SSL_CERT) {
  createHttpsServer()
} else {
  createHttpServerOnly()
}

function createHttpsServer() {
  const options = {
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CERT)
  }

  https.createServer(options, app).listen(443, () => {
    console.log('Server started at https://localhost ...')
  })

  http.createServer(unsafeApp).listen(80, () => {
    console.log('Server started at http://localhost ...')
  })
}

function createHttpServerOnly() {
  http.createServer(app).listen(80, () => {
    console.log('Server started at http://localhost ...')
  })
}
