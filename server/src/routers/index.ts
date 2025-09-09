import { Router } from 'express'
import usersRouter from './usersRoter.js'
import filesRouter from './filesRouter.js'

const router = Router() 

router.use('/users', usersRouter)
router.use('/files', filesRouter)

export default router