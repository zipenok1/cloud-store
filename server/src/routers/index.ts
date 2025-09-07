import { Router } from 'express'
import usersRouter from './usersRoter.js'

const router = Router() 

router.use('/users', usersRouter)

export default router