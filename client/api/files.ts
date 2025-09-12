import axios from "../core/axios"
import { IFilesRes } from "./type/files.type"

export const getFiles = async (token: string): Promise<IFilesRes[]> => {
    axios.defaults.headers.Authorization = `Bearer ${token}`
    return (await axios.get('api/files/')).data
}

export const fileUpload = async (file: File, token: string): Promise<IFilesRes> => {
    axios.defaults.headers.Authorization = `Bearer ${token}`

    const formData = new FormData()
    formData.append('file', file)

    return (await axios.post('api/files/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })).data
}