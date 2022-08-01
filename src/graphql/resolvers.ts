//#--------------------RESOLVERS---------------------------#
//#--------------------------------------------------------#
import {
   resolvers as scalarResolvers,
 } from 'graphql-scalars';
//#--------------------LOCAL-IMPORTS-----------------------#
//---------------------QUERIES:
import { resolveFindUserQuery } from "./queries/findUser.query"
import { resolveFindUserByAddressQuery } from "./queries/findUserByAddress.query"

import { resolveClaimTokensQuery } from "./queries/claimTokens.query"
//---------------------MUTATIONS:
import { resolveRegisterMutation } from "./mutations/register.mutation"
import { resolveLoginMutation } from "./mutations/login.mutation"
import { resolveVerifyJwtMutation } from "./mutations/verifyJWT.mutation"
import { resolveMintTokensMutation } from "./mutations/mintTokens.mutation"
//_____________________TYPES:
import { authResolver } from './auth.resolver';

//#--------------------BODY--------------------------------#
const resolvers = {
   // scalarResolvers,
   ...authResolver,
    Query: {
       ...resolveFindUserQuery,
       ...resolveFindUserByAddressQuery,
       ...resolveClaimTokensQuery
    },

    Mutation: {
       ...resolveRegisterMutation,
       ...resolveLoginMutation,
       ...resolveVerifyJwtMutation,
       ...resolveMintTokensMutation
    },
    
}

export default resolvers