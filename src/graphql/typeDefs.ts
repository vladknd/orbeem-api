//#--------------------TYPE-DEFS------------------------------#
//#-----------------------------------------------------------#


//#--------------------GLOBAL-IMPORTS:------------------------#
import { gql } from "apollo-server-express"
import {
    typeDefs as scalarTypeDefs,
} from 'graphql-scalars';

//#--------------------LOCAL-IMPORTS:--------------------#
//---------------------TYPES:
import { typedefUser } from "./types";
//---------------------QUERIES:
import { typedefFindUserQuery } from "./queries/findUser.query"
import { typedefFindUserByAddressQuery } from "./queries/findUserByAddress.query"

import { typedefClaimTokensQuery } from "./queries/claimTokens.query"
//---------------------MUTATIONS:
import { typedefRegisterMutation } from "./mutations/register.mutation"
import { typedefLoginMutation } from "./mutations/login.mutation"
import { typedefVerifyJwtMutation } from "./mutations/verifyJWT.mutation"

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
    
    // scalarTypeDefs,
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