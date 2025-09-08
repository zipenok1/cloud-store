import { Model } from "sequelize"

export interface IUsers{
    id?: number,
    name: string,
    email: string,
    password: string
}

export interface IFiles{
    id?: number,
    name: string,
    type: string
}

export interface UserInstance extends Model<IUsers>, IUsers {}
export interface FilesInstance extends Model<IFiles>, IFiles {}