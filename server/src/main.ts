import 'dotenv/config'
import express from 'express'
import fileUpload from 'express-fileupload'
import path from 'path'
import cors from 'cors'
import './models/model.js'
import sequelize from './db.js'
import router from './routers/index.js'
import { __dirname } from './utils/paths.js'
import fs from 'fs'
import { configuredFileUpload, fileTypeMiddleware } from './middleware/fileUpload.js'

const folders = ['static/images', 'static/documents', 'static/other'];
folders.forEach(folder => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
});

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(configuredFileUpload);
app.use(fileTypeMiddleware);

app.use('/static/images', express.static(path.resolve(__dirname, 'static/images')));
app.use('/static/documents', express.static(path.resolve(__dirname, 'static/documents')));
app.use('/static/other', express.static(path.resolve(__dirname, 'static/other')));

app.use('/api', router)

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(7000, () => { console.log('server start'); })
    } catch(e){
        console.log('error', e);
    }
}
start()