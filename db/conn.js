import mongoose from "mongoose"
import { logger } from "../utils/logger.js"

const MONGODB_URI = process.env.MONGODB_URI

const mongodb = async () => {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(MONGODB_URI)

        logger({ method: 'DB_CONNECTION', status: 200, message: 'MongoDB Connected' })

    } catch (err) {
        logger({ method: 'DB_CONNECTION', status: 500, message: `Error to connect to MongoDB, ${err}` })
    }
}

export default mongodb