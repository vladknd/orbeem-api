import { gql } from 'apollo-server-express'
import { findUser } from '../../services/user/user.service'

export const typedefFindUserQuery = gql`
    type LoginRequest {
        publicAddress: String!
        nonce: String!
    }

    extend type Query {
        findUser (
            publicAddress: String!,
        ): LoginRequest 
    }
`;

interface Args{
    publicAddress: string;
}
export const resolveFindUserQuery = {
    findUser: async (
        source: undefined,
        {
            publicAddress
        }: Args,
    ) => {
        const user = await findUser(publicAddress)
        if(user) return {
            publicAddress: user.publicAddress,
            nonce: user.nonce
        }

        return null
    }
}