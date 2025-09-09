import { Router } from 'express'
import usersController from '../controllers/users/usersController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/profile', authMiddleware, usersController.getProfile)
router.post('/register', usersController.registr)
router.post('/login', usersController.login)
router.delete('/:id', usersController.delete)

export default router