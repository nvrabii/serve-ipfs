import express from 'express'
import getFromRoot from './routes/getFromRoot.js'
import { errorHandler } from './middleware/index.js'

const app = express()

app.use(getFromRoot)
app.use(errorHandler)

export default app
