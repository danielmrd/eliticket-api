import express from 'express'
const authenticationRouter = express.Router()
import authenticationController from '../../controllers/authenticationControllers/authenticationController.js'
import { authenticationToken } from '../../middleware/authenticationMiddleware.js'

authenticationRouter.post('/', (req, res) => authenticationController.authentication(req, res))

authenticationRouter.post('/logout', authenticationToken([]), (req, res) => authenticationController.signOut(req, res))


export default authenticationRouter