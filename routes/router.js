import express from 'express'
const router = express.Router() 
import authenticationRouter from './authRoutes/authenticationRouter.js'
import dashboardRouter from './appRoutes/dashboardRoutes/dashboardRouter.js'

router.use('/authentication', authenticationRouter)
router.use('/dashboard', dashboardRouter)

export default router