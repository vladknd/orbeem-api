import { gql } from 'apollo-server-express'
import { INewUser } from '../../services/user.services'
import { 
    IAuthRes, 
    registerService 
} from '../../services/auth.services'
import { IAuth, IAuthError, IAuthSuccess } from '../../services/auth.interfaces'


export const typedefRegisterMutation = gql`
    extend type Mutation {
        register (
            publicAddress: String!,
            email: String!,
            firstName: String!,
            surname: String!
            steamId: String!
        ): Auth
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
    ): Promise<IAuth | null> => {
        console.log("REGISTER-MUTATION INITIATED:",
            publicAddress,
            email,
            firstName,
            surname, 
            steamId
        )
        
        
            const regRes = await registerService({
                publicAddress,
                email,
                firstName,
                surname,
                steamId
            })
            console.log("REGISTER-MUTATION: REGISTER-SERVICE RESPONSE:", regRes);
            return regRes
        
    }
}