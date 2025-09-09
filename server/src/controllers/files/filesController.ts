import model from "@/models/model";
import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth.type.js';
import { IFilesResponse } from "./files.type.js";

class FilesController{  
    async getFiles(req: AuthRequest, res: Response<IFilesResponse[] | { message: string }>){
        try{
            if(!req.user) return res.json({message: 'требуеться авторизация'})
            const files = await model.Files.findAll({ where: {userId: req.user.id} })
            return res.json(files)
        } catch(e){
            console.error('ошибка получения files', e)
        }
    }

    async upload(req: AuthRequest, res: Response<IFilesResponse | { message: string }>){
       try{
            if(!req.user) return res.json({message: 'требуеться авторизация'})
            
            const {name, type} = req.body

            if(!name || !type) return res.json({message: 'пропущены обязательные поля'})

            const file = await model.Files.create({
                name,
                type,
                userId: req.user.id
            })
            return res.json(file)
       } catch(e){
        console.error('ошибка загрузки', e)
       }
    }
}

export default new FilesController()