import dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'
import http from 'http'
import https from 'https'

import app from './src/app.js'
import logError from './src/utils/logger.js'
import { err as printError } from './src/utils/console.js'

if (process.env.NODE_ENV !== 'test' && process.env.SSL_KEY && process.env.SSL_CERT) {
  createHttpsServer()
} else {
  createHttpServerOnly()
}

function createHttpsServer() {
  const options = {
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CERT)
  }

  https
    .createServer(options, app)
    .listen(443, () => {
      console.log('Server started at https://localhost ...')
    })
    .on('error', (err) => {
      logError(err, 'https')
    })

  http
    .createServer((req, res) => {
      res.writeHead(301, { Location: 'https://' + req.headers.host + req.url })
      res.end()
    })
    .listen(80, () => {
      console.log('Server started at http://localhost ...')
    })
    .on('error', (err) => {
      err
      logError(err, 'http')
    })
}

function createHttpServerOnly() {
  http
    .createServer(app)
    .listen(80, () => {
      console.log('Server started at http://localhost ...')
    })
    .on('error', (err) => {
      logError(err, 'http')
    })
}

process.on('uncaughtException', (err) => {
  printError('PROCESS', err.message)
  logError(err, 'process')
})
