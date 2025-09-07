import 'dotenv/config'
import express from 'express'
import fileUpload from 'express-fileupload'
import path from 'path'
import cors from 'cors'
import sequelize from './db.js'
import router from './routers/index.js'
import { __dirname } from './utils/paths.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync({ alter: true })
        app.listen(5000, () => { console.log('server start') })
    } catch(e){
        console.log('error', e);
    }
}
start()