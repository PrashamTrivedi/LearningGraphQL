
import {ApolloServer} from 'apollo-server'
import typeDefs from "./typedefs.js"
import resolvers from "./resolvers.js"
import {authorByBookIdLoader} from "./author.js"

const server = new ApolloServer({
    typeDefs, resolvers, csrfPrevention: true, context: {
        loaders: {
            findAuthorsByBookIdsLoader: authorByBookIdLoader(),
        }
    }
})

server.listen({port: 4001}).then(({url}) => {
    console.log(`🚀  Server ready at ${url}`)
})