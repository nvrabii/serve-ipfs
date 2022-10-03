import express from 'express'
import root from './routers/root.js'
import { errorHandler } from './middleware/index.js'

const app = express()

app.use('/', root)
app.use(errorHandler)

export default app
