import { gql } from "apollo-server-express"
import { loginService, IAuthReq, IAuthRes } from "../../services/auth.service"
import { findUser } from "../../services/user.service"


export const typedefLoginMutation = gql`
    type Verified {
        token: String!
        user: User
    }
    extend type Mutation {
        login(
            publicAddress: String!
            signature: String!
        ): Verified
    }
`

export const resolveLoginMutation = {
    login: async (
        _: undefined,
        {
            publicAddress,
            signature
        }: IAuthReq,
    ): Promise<IAuthRes> => {
        const authRes = await loginService({publicAddress, signature})
        console.log("AUTH-RES:", authRes);
        
        return authRes
    }
}