import { Request, Response } from 'express';
import model from '../models/model.js'; 
import { IUsers } from '../models/model.type.js'

interface UserRequest extends Request {
    body: IUsers,
    params: {
        id: string
    }
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
            if(!name || !email) return res.json({message: 'имя и email обязательны для заполнения'})
                
            const date = await model.Users.create({ name, email })
            return res.json(date)
        } catch(e){
            console.error('ошибка создания users', e)
        }
    }

    async delete(req: UserRequest, res: Response){
        try{
            const { id } = req.params
            if(!id) return res.json({message: 'id user не найден'})
            
            const date = await model.Users.findOne({ where: { id: id }})
            if(!date) return res.json({message: 'такого users не существует'})
            
            await model.Users.destroy({where: { id: id }})
            return res.json({message: 'user c id: ' + id + ' успешно удален'})
        } catch(e){
            console.error('ошибка удаления users', e)
        }
    }
}

export default new UsersContollre()