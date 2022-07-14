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
    balance: number;
}
export interface INewUser {
    publicAddress: string;
    email: string;
    firstName: string;
    surname: string;
    username: string;
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
    console.log("PRISMA FOUND USER:", user)
    
    return user
}

export const findSteamID = async (_publicAddress: string): Promise<string | null> => {
    const user = await prismaClient.user.findUnique({
        where: {
            publicAddress: _publicAddress
        }
    })
    console.log("FOUND USER:", user)

    if(user && user.steamId){
        const { steamId } = user
        return steamId
    } else {
        return null
    }
    
}

export const updateUserSteam = async (username: string, steamId: string): Promise<IUser | null> => {
    const updatedUser = await prismaClient.user.update({
        where: {
            username
        },
        data: {
            steamId
        }
    })
    return updatedUser
}

export const updateBalance = async (_publicAddress: string, _newBalance: number) => {
    const updatedUser = await prismaClient.user.update({
        where: {
            publicAddress: _publicAddress
        },
        data: {
            balance: _newBalance
        }
    })
    return updatedUser.balance
}

export const getBalance = async (_publicAddress: string) => {
    const user = await prismaClient.user.findUnique({
        where: {
            publicAddress: _publicAddress
        }
    })
    return user?.balance
}