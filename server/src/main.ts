import 'dotenv/config'
import express from 'express'
import path from 'path'
import cors from 'cors'
import './models/model.js'
import sequelize from './db.js'
import router from './routers/index.js'
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

const staticPath = path.join(process.cwd(), 'static')
console.log('Absolute static path:', staticPath)
app.use('/static', express.static(staticPath))

app.use(configuredFileUpload)
app.use(fileTypeMiddleware)

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