"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typedefUser = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typedefUser = (0, apollo_server_express_1.gql) `
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
        award: Float!
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
`;
