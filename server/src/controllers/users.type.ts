import { Request } from 'express';

export interface IUserResponse {
    id?: number;
    name: string;
    email: string;
}

export interface IUserLoginResponse {
    token: string;
    user: IUserResponse;
}

export interface IUserAuthRequest extends Request {
    body: {
        name?: string;
        email: string;
        password: string;
    }
}

export interface IUserDeleteRequest extends Request {
    params: {
        id: string;
    }
}