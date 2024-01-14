import express from 'express'
import dashboardController from '../../../controllers/appControllers/dashboardControllers/dashboardController.js'
import { authenticationToken } from '../../../middleware/authenticationMiddleware.js'
const dashboardRouter = express.Router()

dashboardRouter.get('/', authenticationToken([]), (req, res) => dashboardController.getHome(req, res))

export default dashboardRouter