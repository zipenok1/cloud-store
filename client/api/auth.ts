import axios from "../core/axios"
import { IloginForm, IloginRes, TregistrForm, TregistrRes } from "./type/auth.type"

export const login = async (values: IloginForm): Promise<IloginRes> =>{
    return (await axios.post('api/users/login', values)).data
}

export const registr = async (values: TregistrForm): Promise<TregistrRes> => {
    return (await axios.post('api/users/register', values)).data
}