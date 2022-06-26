import {gql} from "apollo-server"

const typeDefs = gql`
schema{
    query: Query
}
type Query{
    books(orderBy: BookSorting = CREATED_AT_DESC): [Book]
    reviews(orderBy: RatingSorting = CREATED_AT_DESC): [Review]
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
    createdAt: String
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
    createdAt: String
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

enum BookSorting{
    RATING_DESC
    CREATED_AT_DESC
    CREATED_AT_ASC
}

enum RatingSorting{
    CREATED_AT_ASC
    CREATED_AT_DESC
}


`

export default typeDefs