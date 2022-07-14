//#--------------------TYPE-DEFS------------------------------#
//#-----------------------------------------------------------#


//#--------------------GLOBAL-IMPORTS:------------------------#
import { gql } from "apollo-server-express"


//#--------------------LOCAL-IMPORTS:--------------------#
//---------------------TYPES:
import { typedefUser } from "./types";
//---------------------QUERIES:
import { typedefFindUserQuery } from "./queries/findUser"
import { typedefFindUserByAddressQuery } from "./queries/findUserByAddress"

import { typedefClaimTokensQuery } from "./queries/claimTokens.query"
//---------------------MUTATIONS:
import { typedefRegisterMutation } from "./mutations/register"
import { typedefLoginMutation } from "./mutations/login"
import { typedefVerifyJwtMutation } from "./mutations/verifyJWT"

import { typedefMintTokensMutation } from "./mutations/mintTokens.mutation"




//#--------------------BODY---------------------#
export const typeDefs = gql`
    type AuthRes {
        user: User!
        token: String!
    }
    
    type Query {
        root: String
    }

    type Mutation {
        root: String
    }
`;

//#--------------------EXPORT---------------------#
export default [
    typeDefs,

    //------------------TYPES:
    typedefUser,

    //------------------QUERIES:
    typedefFindUserQuery,
    typedefFindUserByAddressQuery,
    typedefClaimTokensQuery,

    //------------------MUTATIONS:
    typedefRegisterMutation,
    typedefLoginMutation, 
    typedefVerifyJwtMutation,
    typedefMintTokensMutation
]