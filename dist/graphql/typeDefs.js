"use strict";
//#--------------------TYPE-DEFS------------------------------#
//#-----------------------------------------------------------#
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
//#--------------------GLOBAL-IMPORTS:------------------------#
const apollo_server_express_1 = require("apollo-server-express");
//#--------------------LOCAL-IMPORTS:--------------------#
//---------------------TYPES:
const types_1 = require("./types");
//---------------------QUERIES:
const findUser_query_1 = require("./queries/findUser.query");
const findUserByAddress_query_1 = require("./queries/findUserByAddress.query");
const claimTokens_query_1 = require("./queries/claimTokens.query");
//---------------------MUTATIONS:
const register_mutation_1 = require("./mutations/register.mutation");
const login_mutation_1 = require("./mutations/login.mutation");
const verifyJWT_mutation_1 = require("./mutations/verifyJWT.mutation");
const mintTokens_mutation_1 = require("./mutations/mintTokens.mutation");
//#--------------------BODY---------------------#
exports.typeDefs = (0, apollo_server_express_1.gql) `
    
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
exports.default = [
    exports.typeDefs,
    // scalarTypeDefs,
    //------------------TYPES:
    types_1.typedefUser,
    //------------------QUERIES:
    findUser_query_1.typedefFindUserQuery,
    findUserByAddress_query_1.typedefFindUserByAddressQuery,
    claimTokens_query_1.typedefClaimTokensQuery,
    //------------------MUTATIONS:
    register_mutation_1.typedefRegisterMutation,
    login_mutation_1.typedefLoginMutation,
    verifyJWT_mutation_1.typedefVerifyJwtMutation,
    mintTokens_mutation_1.typedefMintTokensMutation
];
