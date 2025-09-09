import { Response, NextFunction } from 'express'
import fileUpload from 'express-fileupload';
import path from 'path';
import { FileUploadRequest } from './file.type';

export const configuredFileUpload = fileUpload({
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    abortOnLimit: true,
    safeFileNames: true,
    preserveExtension: true,
    useTempFiles: true,
    tempFileDir: '/tmp/'
});

export const fileTypeMiddleware = (req: FileUploadRequest, res: Response, next: NextFunction) => {
    if (!req.files || Object.keys(req.files).length === 0) return next()

    const file = req.files.file

    if (Array.isArray(file)) return next(new Error('ожидался один файл, получен массив'))

    const extension = path.extname(file.name).toLowerCase()
    
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'].includes(extension)) {
        req.fileType = 'image'
    } else if (['.pdf', '.doc', '.docx', '.txt', '.xlsx', '.xls'].includes(extension)) {
        req.fileType = 'document'
    } else {
        req.fileType = 'other'
    }
    
    req.fileExtension = extension
    next()
};