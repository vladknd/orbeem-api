import { ApolloClient, InMemoryCache } from '@apollo/client'

export const graphClient = new ApolloClient({
    uri: 'http://52.37.206.149/api/graphql',
    cache: new InMemoryCache()
})