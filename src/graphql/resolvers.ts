//#--------------------RESOLVERS---------------------------#
//#--------------------------------------------------------#

//#--------------------LOCAL-IMPORTS-----------------------#
//---------------------QUERIES:
import { resolveFindUserQuery } from "./queries/findUser"
import { resolveFindUserByAddressQuery } from "./queries/findUserByAddress"

import { resolveClaimTokensQuery } from "./queries/claimTokens.query"
//---------------------MUTATIONS:
import { resolveRegisterMutation } from "./mutations/register"
import { resolveLoginMutation } from "./mutations/login"
import { resolveVerifyJwtMutation } from "./mutations/verifyJWT"
import { resolveMintTokensMutation } from "./mutations/mintTokens.mutation"

//#--------------------BODY--------------------------------#
const resolvers = {
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
    }
}

export default resolvers