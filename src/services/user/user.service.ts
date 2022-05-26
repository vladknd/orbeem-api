import { prisma } from "@prisma/client";
import { prismaClient } from "../../db";

export interface IUser {
    id: number;
    nonce: number;
    publicAddress: string;
    email: string;
    username: string | null;
    firstName: string;
    surname: string;
    steamId: string | null;
}
export interface INewUser {
    publicAddress: string;
    email: string;
    firstName: string;
    surname: string;
}

export const createUser = async (newUser: INewUser): Promise<IUser> => {
    const user = await prismaClient.user.create({
        data: {
            nonce: Math.floor(Math.random() * 10000),
            ...newUser
        }
    })
    console.log("CREATED USER:", user)
    
    return user
}

export const findUser = async (publicAddress: string): Promise<IUser | null> => {
    const user = await prismaClient.user.findUnique({
        where: {
            publicAddress
        }
    })
    console.log("FOUND USER:", user)
    
    return user
}

export const updateUserSteam = async (publicAddress: string, steamId: string, username: string): Promise<IUser | null> => {
    const updatedUser = await prismaClient.user.update({
        where: {
            publicAddress
        },
        data: {
            steamId,
            username
        }
    })
    return updatedUser
}