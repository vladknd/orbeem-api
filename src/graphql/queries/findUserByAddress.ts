import { gql } from 'apollo-server-express'
import { findUser } from '../../services/user/user.service'

export const typedefFindUserByAddressQuery = gql`
    extend type Query {
        findUserByAddress (
            publicAddress: String!,
        ): User 
    }
`;

interface Args{
    publicAddress: string;
}
export const resolveFindUserByAddressQuery = {
    findUserByAddress: async (
        source: undefined,
        {
            publicAddress
        }: Args,
    ) => {
        console.log("GOT", publicAddress);
        try {
            const user = await findUser(publicAddress)
            console.log(user);
            
            return user
        } catch (error) {
            
        }
    }
}