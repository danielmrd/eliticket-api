import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import router from './routes/router.js'
import cookieParser from 'cookie-parser'
import mongodb from './db/conn.js'
import { logger } from './utils/logger.js'

const SERVER_PORT = process.env.SERVER_PORT

const app = express()

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(cors());
app.use(cookieParser())

app.use('/api', router)

mongodb()

app.listen(SERVER_PORT, () => {
    logger({ method: 'SERVER', status: 200, message: `Eliticket App is running on port: ${SERVER_PORT}` })
})