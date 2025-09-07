import { Router } from 'express'
import usersController from '../controllers/usersController.js'

const router = Router()

router.get('/', usersController.receipt)
router.post('/', usersController.adder)

export default router