import sequelize from "../db.js"
import { DataTypes, Model } from "sequelize"
import { UserInstance, FilesInstance } from './model.type.js'       

const Users = sequelize.define<UserInstance>('users', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING(150),
        allowNull: false, 
    }
}, {
    tableName: 'users',
    timestamps: false,
})

const Files = sequelize.define<FilesInstance>('files', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    type:{
        type: DataTypes.STRING(150),
        allowNull: true,
    }
}, {
    tableName: 'files',
    timestamps: false  
})

export default {
    Users,
    Files
}