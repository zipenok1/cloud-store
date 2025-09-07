import { Request, Response } from 'express';
import model from '../models/model.js'; 
import { IUsers } from '../models/model.type.js'

interface UserRequest extends Request {
    body: IUsers
}

class UsersContollre {
    async receipt(req: Request, res: Response){
        try{
            const date = await model.Users.findAll()
            return res.json(date)
        } catch(e){
            console.error('ошибка получения users', e)
        }
    }

    async adder(req: UserRequest, res: Response){
        try{
            const { name, email } = req.body
            const date = await model.Users.create({ name, email })
            return res.json(date)
        } catch(e){
            console.error('ошибка создания users', e)
        }
    }
}

export default new UsersContollre()