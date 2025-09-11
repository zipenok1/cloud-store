export interface IloginForm{
    email: string,
    password: string
}

export interface IloginRes{
    token: string
}

export type TregistrForm = IloginForm & {name: string}
export type TregistrRes = IloginRes

export interface IUsers{
    id?: number,
    name: string,
    email: string
}