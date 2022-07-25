import { gql } from 'apollo-server-express'
import { INewUser } from '../../services/user.service'
import { 
    IAuthRes, 
    registerService 
} from '../../services/auth.service'

export const typedefRegisterMutation = gql`
    extend type Mutation {
        register (
            publicAddress: String!,
            email: String!,
            firstName: String!,
            surname: String!
            steamId: Int!
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
            steamId
        }: INewUser,
    ): Promise<IAuthRes> => {
        const authRes = await registerService({
            publicAddress,
            email,
            firstName,
            surname,
            steamId
        })
        console.log("AUTH-RES:", authRes);
        
        return authRes
    }
}