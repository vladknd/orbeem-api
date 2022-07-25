import { prisma, User } from "@prisma/client";
import { prismaClient } from "../db";

export interface INewUser {
    publicAddress: string;
    email: string;
    firstName: string;
    surname: string;
    steamId: string;
}

//USER_____________________________________________________________________________
export const createUser = async (_newUser: INewUser): Promise<User | null> => {
    console.log("DB: CREATE-USER SERVICE INITIATED: ", _newUser)
    try {
        const user = await prismaClient.user.create({
            data: {
                nonce: Math.floor(Math.random() * 10000),
                ..._newUser
            }
        })
        return user
        console.log("CREATED USER:", user)
    } catch (error) {
        console.log(error);
        return null
    }
    
     
}
export const findUser = async (_publicAddress: string): Promise<User | null> => {
    console.log("DB: FIND-USER SERVICE INITIATED:", _publicAddress);
    const user = await prismaClient.user.findUnique({
        where: {
            publicAddress: _publicAddress
        }
    })
    console.log("PRISMA FOUND USER:", user)
    
    return user
}
//_________________________________________________________________________________




//STEAM______________________________________________________________________________________________________
export const findSteamID = async (_publicAddress: string): Promise<string | null> => {
    console.log("DB: FIND-STEAM-ID SERVICE INITIATED:", _publicAddress)
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

export const updateUserSteam = async (_username: string, _steamId: string): Promise<User | null> => {
    console.log("DB: UPDATE-USER-STEAM SERVICE INITIATED: ", _username, _steamId)
    const updatedUser = await prismaClient.user.update({
        where: {
            username: _username
        },
        data: {
            steamId: _steamId
        }
    })
    return updatedUser
}
//______________________________________________________________________________________________________________




//BALANCE_________________________________________________________________________________________
export const updateBalance = async (_publicAddress: string, _newBalance: number) => {
    console.log("DB: UPDATE-BALANCE SERVICE INITIATED:", _publicAddress, _newBalance)
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
    console.log("DB: GET-BALANCE SERVICE INITIATED:", _publicAddress)
    const user = await prismaClient.user.findUnique({
        where: {
            publicAddress: _publicAddress
        }
    })
    return user?.balance
}
//_________________________________________________________________________________________________




//VERIFIED______________________________________________________________________________________________________
export const getVerified = async (_publicAddress: string) => {
    console.log("DB: GET-VERIFIED SERVICE INITIATED: ", _publicAddress)
    const user = await prismaClient.user.findUnique({
        where: {
            publicAddress: _publicAddress
        }
    })
    return user?.verified
}

export const setVerified = async (_steamId: string, _username: string) => {
    console.log("DB: SET-VERIFIED SERVICE INITIATED: ", _steamId, _username);
    
    const user = await prismaClient.user.update({
        where: {
            steamId: _steamId
        },
        data: {
            verified: true,
            username: _username
        }
    })
    return user?.verified
}
//_______________________________________________________________________________________________________________