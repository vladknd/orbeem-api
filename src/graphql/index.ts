//#--------------------GRAPHQL-INDEX-----------------------------#
//#--------------------------------------------------------------#

//#--------------------GLOBAL-IMPORTS:---------------------------#
import { ApolloServer } from "apollo-server-express"

//#--------------------LOCAL-IMPORTS:----------------------------#
import typeDefs from "./typeDefs"
import resolvers from "./resolvers"

//#--------------------BODY--------------------------------------#
export default () => {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req}) => {
            console.log("REQ:", req.headers);
            
        }
    })

    return apolloServer
}