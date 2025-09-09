import { Model } from "sequelize"

export interface IUsers{
    id?: number,
    name: string,
    email: string,
    password: string
}

export interface IFiles{
    id?: number,
    originalName: string,
    extension: string,
    size: number,
    type: 'image' | 'document' | 'other',
    path: string,
    userId: number
}

export interface UserInstance extends Model<IUsers>, IUsers {}
export interface FilesInstance extends Model<IFiles>, IFiles {}