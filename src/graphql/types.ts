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

#______________AUTH____________________________________
    type AuthError {
        type: String!
        message: String!
    }
    
    type AuthSuccess {
        user: User!
        token: String!
    }
    
    union Auth = AuthSuccess | AuthError
#____________________________________________________________

#______________GAME____________________________________
    type Award {
        award: Int!
        kills: Int!
        deaths: Int!
        assists: Int!
    }

    type MintSuccess {
        success: Award!

    }
    type MintError {
        error: String!
    }
    union Mint = MintSuccess | MintError


    type ClaimSuccess {
        success: Award!

    }
    type ClaimError {
        error: String!
    }
    union Claim = ClaimSuccess | ClaimError
#____________________________________________________________
`


