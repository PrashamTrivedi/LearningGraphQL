import {gql} from "apollo-server"

const typeDefs = gql`
schema{
    query: Query
}
type Query{
    books: [Book]
    reviews: [Review]
}
type Book{
    id: ID!
    title: String!
    description: String!
    imageUrl(size:ImageSize=LARGE): String
    rating: Float
    subtitle: String!
    ratingCount: Float
    authors: [Author]
    
}
type Author{
    id: ID!
    name: String
}
type Review{
    id: ID!
    rating: Int
    title: String
    comment: String
    books: [Book]
    users: [User]
}

type User{
    id: ID!
    email: String
    name: String
}

enum ImageSize{
    SMALL
    LARGE
}
`

export default typeDefs