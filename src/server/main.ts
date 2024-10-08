import express from 'express'
import ViteExpress from 'vite-express'
import apiRouter from '@app/server/router'
import { config as readEnv } from 'dotenv'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//TODO: (SanityEnhancements) Implement CORS
readEnv()
app.use('/api', apiRouter)
const __PORT__ = parseInt(process.env.PORT ?? '6566')
ViteExpress.listen(app, __PORT__, () => console.log(`Server is listening on port ${__PORT__}...`))
