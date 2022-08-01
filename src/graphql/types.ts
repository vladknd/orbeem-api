import { gql } from 'apollo-server-express'

export const typedefUser = gql`
    type User {
        id: ID!
        publicAddress: String!
        nonce: Int!
        firstName: String!
        surname: String!
        email: String!
        username: String
        steamId: String!
        balance: Int
        verified: Boolean!
    }

    type AuthError {
        type: String!
        message: String!
    }
    
    type AuthSuccess {
        user: User!
        token: String!
    }
    
    union Auth = AuthSuccess | AuthError
`

