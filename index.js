
import {ApolloServer} from 'apollo-server'
import typeDefs from "./typedefs.js"
import resolvers from "./resolvers.js"

const server = new ApolloServer({
    typeDefs, resolvers, csrfPrevention: true,
})

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`)
})