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
//---------------------MUTATIONS:
import { typedefRegisterMutation } from "./mutations/register"
import { typedefLoginMutation } from "./mutations/login"
import { typedefVerifyJwtMutation } from "./mutations/verifyJWT"



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

    //------------------MUTATIONS:
    typedefRegisterMutation,
    typedefLoginMutation, 
    typedefVerifyJwtMutation
]