import { gql } from 'apollo-server-express'
import { INewUser } from '../../services/user/user.service'
import { 
    IAuthRes, 
    registerService 
} from '../../services/auth/auth.service'

export const typedefRegisterMutation = gql`
    extend type Mutation {
        register (
            publicAddress: String!,
            email: String!,
            firstName: String!,
            surname: String!
            username: String!
        ): AuthRes
    }
`

export const resolveRegisterMutation = {
    register: async (
        source: undefined,
        {
            publicAddress,
            email,
            firstName,
            surname, 
            username
        }: INewUser,
    ):Promise<IAuthRes> => {
        const authRes = await registerService({
            publicAddress,
            email,
            firstName,
            surname,
            username
        })
        console.log("AUTH-RES:", authRes);
        
        return authRes
    }
}