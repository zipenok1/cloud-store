import { Response } from 'express';
import model from '../../models/model.js'
import { hashPassword, comparePassword } from '../../utils/password.js'
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../../middleware/auth.type.js';
import { IUserAuthRequest, IUserDeleteRequest, IUserLoginResponse, IUserResponse } from './users.type.js';

class UsersContollre {
    async registr(req: IUserAuthRequest, res: Response<IUserLoginResponse | { message: string }>){
        try{
            const { name, email, password } = req.body
            if(!name || !email || !password) return res.status(401).json({message: 'name, email и password обязательны для заполнения'})
            
            const exist = await model.Users.findOne({where: { email: email }})
            if(exist) return res.status(401).json({ message: 'user с таким email уже существует' })
            
            const hashedPassword = await hashPassword(password)
            const user = await model.Users.create({ name, email, password: hashedPassword }) 

            if (!user.id || !user.email || !user.name) return res.status(401).json({ message: 'ошибка создания пользователя' })

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET || 'secret-key',
                { expiresIn: '24h' }
            )
            return res.status(200).json({token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            })
        } catch(e){
            console.error('ошибка регистрации', e)
        }
    }

    async login(req: IUserAuthRequest, res: Response<IUserLoginResponse | { message: string }>){
        try{
            const { email, password } = req.body
            if(!email || !password) return res.status(401).json({message: 'email и password обязательны'})
            
            const user = await model.Users.findOne({where: {email: email}}) 
            if(!user) return res.status(401).json({message: 'user не найден'})
            
            const isValidPassword = await comparePassword(password, user.password)
            if(!isValidPassword) return res.status(401).json({message: 'неверный пароль'}) 

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET || 'secret-key',
                { expiresIn: '24h' }
            );

            return res.status(200).json({
                token,
                message: 'вы успешно авторизовались'
            });
        } catch(e){
            console.error('ошибка авторизации', e)
        }
    }
    
    async getProfile(req: AuthRequest, res: Response<IUserResponse | { message: string }>){
        try{
            if (!req.user)  return res.json({ message: 'требуется авторизация' })

            const user = await model.Users.findByPk(req.user.id, {
                attributes: { exclude: ['password'] }
            })

            if(!user) return res.json({ message: 'пользователь не найден' })

            return res.json(user)
        } catch(e){
            console.error('ошибка получения user', e)
        }
    }

    async delete(req: IUserDeleteRequest, res: Response){
        try{
            const { id } = req.params
            if(!id) return res.json({message: 'user с id: ' + id +' не найден'})
            
            const user = await model.Users.findOne({ where: { id: id }})
            if(!user) return res.json({message: 'такого user не существует'})
            
            await model.Users.destroy({where: { id: id }})
            return res.json({message: 'user c id: ' + id + ' успешно удален'})
        } catch(e){
            console.error('ошибка удаления user', e)
        }
    }
}

export default new UsersContollre()