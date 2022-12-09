"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#--------------------LOCAL-IMPORTS-----------------------#
//---------------------QUERIES:
const findUser_query_1 = require("./queries/findUser.query");
const findUserByAddress_query_1 = require("./queries/findUserByAddress.query");
const claimTokens_query_1 = require("./queries/claimTokens.query");
//---------------------MUTATIONS:
const register_mutation_1 = require("./mutations/register.mutation");
const login_mutation_1 = require("./mutations/login.mutation");
const verifyJWT_mutation_1 = require("./mutations/verifyJWT.mutation");
const mintTokens_mutation_1 = require("./mutations/mintTokens.mutation");
//_____________________TYPES:
const type_resolver_1 = require("./type.resolver");
//#--------------------BODY--------------------------------#
const resolvers = Object.assign(Object.assign({}, type_resolver_1.authResolver), { Query: Object.assign(Object.assign(Object.assign({}, findUser_query_1.resolveFindUserQuery), findUserByAddress_query_1.resolveFindUserByAddressQuery), claimTokens_query_1.resolveClaimTokensQuery), Mutation: Object.assign(Object.assign(Object.assign(Object.assign({}, register_mutation_1.resolveRegisterMutation), login_mutation_1.resolveLoginMutation), verifyJWT_mutation_1.resolveVerifyJwtMutation), mintTokens_mutation_1.resolveMintTokensMutation) });
exports.default = resolvers;
