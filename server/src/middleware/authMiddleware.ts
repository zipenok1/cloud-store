import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AuthRequest, JwtPayload } from './auth.type'

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key'

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization
    
    if (!authHeader) return res.json({ message: 'Требуется авторизация' })

    const token = typeof authHeader === 'string' 
      ? authHeader.replace('Bearer ', '')
      : authHeader[0]?.replace('Bearer ', '')

    if (!token) return res.json({ message: 'Неверный формат токена' })

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
    
    if (!decoded.id || !decoded.email) return res.json({ message: 'Невалидный токен' })
    req.user = decoded
    next();
  } catch (e) {
    return res.json({ message: 'Неверный токен' })
  }
}