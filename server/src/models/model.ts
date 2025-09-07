import sequelize from "../db.js";
import { DataTypes, Model } from "sequelize";
import { IUsers, IFiles } from './model.type.js'

const Users = sequelize.define<Model<IUsers>>('users', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    email:{
        type: DataTypes.STRING(150),
        allowNull: true,
    }
})

const Files = sequelize.define<Model<IFiles>>('files', {
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
})

export default {
    Users,
    Files
}