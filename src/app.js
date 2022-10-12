import express from 'express'
import { root, ipfs } from './routers/index.js'
import { errorHandler } from './middleware/index.js'

const app = express()

app.use(ipfs)
app.use(root)

app.use(errorHandler)

export default app
