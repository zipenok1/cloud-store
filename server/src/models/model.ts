import sequelize from "../db.js"
import { DataTypes } from "sequelize"
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
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    originalName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    extension: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('image', 'document', 'other'),
        allowNull: false,
    },
    path: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    }
}, {
    tableName: 'files',
    timestamps: false  
})


Users.hasMany(Files, { foreignKey: 'userId', as: 'files' })
Files.belongsTo(Users, { foreignKey: 'userId', as: 'user' })


export default {
    Users,
    Files
}