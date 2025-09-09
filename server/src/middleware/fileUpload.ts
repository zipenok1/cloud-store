import fileUpload from 'express-fileupload';
import path from 'path';

export const configuredFileUpload = fileUpload({
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    abortOnLimit: true,
    safeFileNames: true,
    preserveExtension: true,
    useTempFiles: true,
    tempFileDir: '/tmp/'
});

export const fileTypeMiddleware = (req: any, res: any, next: any) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next()
    }

    const file = req.files.file;
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