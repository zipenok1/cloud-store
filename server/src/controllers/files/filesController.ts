import model from "../../models/model.js";
import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth.type.js';
import { IFilesResponse } from "./files.type.js";
import fileUpload from "express-fileupload";
import path from "path";

class FilesController{  
    async getFiles(req: AuthRequest, res: Response<IFilesResponse[] | { message: string }>){
        try{
            if(!req.user) return res.json({ message: 'требуеться авторизация' })

            const { type } = req.query

            const whereClause: any = {userId: req.user.id}
            if(type && ['image', 'document', 'other'].includes(type as string)){
                whereClause.type = type
            }

            const files = await model.Files.findAll({
                where: whereClause,
                attributes: ['id', 'originalName', 'size', 'type', 'path', 'extension']
            })

            const response = files.map(file => ({
                ...file.toJSON(),
                url: `/static/${file.type}s/${file.originalName}`
            }))

            return res.json(response)
        } catch(e){
            console.error('ошибка получения files', e)
        }
    }

    async upload(req: AuthRequest, res: Response<IFilesResponse | { message: string }>){
        try {
            if (!req.user)  return res.status(401).json({ message: 'требуется авторизация' })
            
            if (!req.files || !req.files.file) return res.status(400).json({ message: 'файл не загружен' })
            
            const file = req.files.file as fileUpload.UploadedFile
            const extension = path.extname(file.name).toLowerCase()
            const fileName = file.name
            
            let fileType: 'image' | 'document' | 'other'
            let savePath: string

            if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'].includes(extension)) {
                fileType = 'image'
                savePath = path.join('static', 'images', fileName)
            } else if (['.pdf', '.doc', '.docx', '.txt', '.xlsx', '.xls'].includes(extension)) {
                fileType = 'document'
                savePath = path.join('static', 'documents', fileName)
            } else {
                fileType = 'other'
                savePath = path.join('static', 'other', fileName)
            }

            await file.mv(savePath);

            const dbFile = await model.Files.create({
                originalName: fileName,
                extension: extension,
                size: file.size,
                type: fileType,
                path: savePath,
                userId: req.user.id
            })

            return res.status(201).json({
                id: dbFile.id,
                originalName: dbFile.originalName,
                extension: dbFile.extension,
                type: dbFile.type,
                size: dbFile.size,
                url: `/static/${fileType}s/${fileName}` 
            });

        } catch (e) {
            console.error('ошибка загрузки файла', e)
        }
    }
}

export default new FilesController()