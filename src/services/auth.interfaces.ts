import { User } from "@prisma/client";

// export interface IAuth {
//     user: User | null,

// }
export type IAuth = IAuthSuccess | IAuthError;

export interface IAuthSuccess {
    user: User;
    token: string;
}

export enum ErrorType {
    UNIQUE = "Unique"
}

export enum Field {
    EMAIL = "email",
    ADDRESS = "address"
}

export interface IAuthError {
    type: ErrorType
    message: Field
}