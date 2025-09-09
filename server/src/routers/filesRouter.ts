import { Router } from 'express'
import filesController from '../controllers/files/filesController.js' 
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', authMiddleware, filesController.getFiles)
router.post('/', authMiddleware, filesController.upload)

export default router