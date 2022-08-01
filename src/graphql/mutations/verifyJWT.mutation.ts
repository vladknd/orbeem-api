import { gql } from "apollo-server-express"
import jwt from "jsonwebtoken"
import { findUser } from "../../services/user.services"

export const typedefVerifyJwtMutation = gql`
    extend type Mutation {
        verifyJwt(token: String): User 
    }
`

export const resolveVerifyJwtMutation = {
    verifyJwt: async (
        _: undefined,
        {
            token
        }: { token: string}
    ) => {
        console.log("VERIFY JWT MUTATION INITIATED:")
        
        const decoded = await jwt.verify(token, "hihi")
        if(typeof decoded !== "string"){
            console.log("DECODED", decoded.publicAddress)
            const user = await findUser(decoded.publicAddress)
            console.log("USER", user)
            return user
        }
    }
}