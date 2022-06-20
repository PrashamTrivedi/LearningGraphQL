import {graphql} from "graphql"
import {makeExecutableSchema} from "@graphql-tools/schema"

const typeDefs = `
schema {
    query: Query
}
type Query {
    hello: String
    kenobi: String
}
`

const resolvers = {
    Query: {
        hello: () => "there",
        kenobi: () => "General Kenooobbbiii!!!!"
    }
}

const schema = makeExecutableSchema({typeDefs, resolvers})

const query = process.argv[2]

graphql({schema, source: query}).then(result => {
    console.log(JSON.stringify(result, null, 4))
})