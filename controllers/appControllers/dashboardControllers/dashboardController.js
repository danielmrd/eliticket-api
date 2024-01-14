import dotenv from 'dotenv'
dotenv.config() 
import Joi from 'joi'

const dashboardController = {
    getHome: async (req, res) => {

        return res.status(200).json({ message: 'Welcome, you have permission' })

    }
}

export default dashboardController