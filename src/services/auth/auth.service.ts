import { recoverPersonalSignature } from "eth-sig-util";
import { bufferToHex } from "ethereumjs-util";
import { prismaClient } from "../../db"
import jwt from "jsonwebtoken"
import { createUser, INewUser, IUser } from "../user/user.service";

export interface IAuthRes {
    user: IUser;
    token: string;
}
export interface IAuthReq {
    publicAddress: string;
    signature: string;
}

//_________________________________LOGIN-SERVICE_____________________________________
export const loginService = async (authData: IAuthReq): Promise<IAuthRes> => {
    console.log("REQUESTED");

    console.log("AUTH",authData)
    const { publicAddress, signature } = authData;
    if (!signature || !publicAddress) throw new Error("INVALID AUTHENTICATION DATA")
    
    const user = await prismaClient.user.findUnique({
        where: {
            publicAddress
        }
    })
    if(!user) throw new Error("USER DOES NOT EXIST")
    console.log("USER HAS BEEN FOUND")
    
    const msg = `I am signing my one-time nonce: ${user.nonce}`
    const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'))
    const address = recoverPersonalSignature({
        data: msg,
        sig: signature
    })
    console.log("ADDRESS", address)
    

    const validAddress = address.toLowerCase() === publicAddress.toLowerCase()
    if (!validAddress) throw new Error("ADDRESS VERIFICATION FAILED")
    console.log("USER HAS BEEN VERIFIED")
    
	await prismaClient.user.update({
        where: {
          publicAddress
        },
        data: {
          nonce: Math.floor(Math.random() * 10000),
        },
    })
    
    const token = await generateToken({id: user.id, publicAddress})
    const authRes = {token, user}
    console.log("AUTH-RES:",authRes)
    return authRes
}

//_____________________________REGISTRATION-SERVICE________________________________
export const registerService = async (newUser: INewUser) => {
    const user: IUser = await createUser({
        publicAddress: newUser.publicAddress,
        email: newUser.email,
        firstName: newUser.firstName,
        surname: newUser.surname
    })
    console.log("REGISTERED USER", user) 
    
    const token = generateToken({
        id: user.id,
        publicAddress: user.publicAddress
    })
    console.log("TOKEN GENERATED", token)
    
    return {user, token}
}

//__________________________TOKEN-GENERATOR_____________________________
interface IJWTPayload {
    id: number;
    publicAddress: String;
}
export const generateToken = ({id, publicAddress}: IJWTPayload) => {
    return jwt.sign(
        {
            id,
            publicAddress
        },
        "hihi",
        {
            algorithm: "HS256",
        }
    )
}