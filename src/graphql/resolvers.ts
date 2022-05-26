//#--------------------RESOLVERS---------------------------#
//#--------------------------------------------------------#

//#--------------------LOCAL-IMPORTS-----------------------#
//---------------------QUERIES:
import { resolveFindUserQuery } from "./queries/findUser"
import { resolveFindUserByAddressQuery } from "./queries/findUserByAddress"
//---------------------MUTATIONS:
import { resolveRegisterMutation } from "./mutations/register"
import { resolveLoginMutation } from "./mutations/login"
import { resolveVerifyJwtMutation } from "./mutations/verifyJWT"

//#--------------------BODY--------------------------------#
const resolvers = {
    Query: {
       ...resolveFindUserQuery,
       ...resolveFindUserByAddressQuery
    },

    Mutation: {
       ...resolveRegisterMutation,
       ...resolveLoginMutation,
       ...resolveVerifyJwtMutation
    }
}

export default resolvers