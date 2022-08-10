import { User } from "@prisma/client";


export type IAuth = IAuthSuccess | IAuthError;


export interface IAuthSuccess {
    user: User;
    token: string;
}


export interface IAuthError {
    type: ErrorType
    message: Field
}
export enum ErrorType {
    UNIQUE = "Unique"
}
export enum Field {
    EMAIL = "email",
    ADDRESS = "address"
}
