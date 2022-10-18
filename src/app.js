import express from 'express'
import { root, ipfs } from './routes/index.js'
import { errorHandler } from './handlers/index.js'

const app = express()

app.use(ipfs)
app.use(root)

app.use(errorHandler)

export default app
