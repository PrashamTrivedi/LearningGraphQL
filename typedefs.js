import {gql} from "apollo-server"

const typeDefs = gql`
schema{
    query: Query
    mutation: Mutation
}
type Query{
    books(orderBy: BookSorting = CREATED_AT_DESC): [Book]
    reviews(orderBy: RatingSorting = CREATED_AT_DESC): [Review]
    book(id:ID!): Book
    searchBook(searchQuery:String!):[SearchBookResult]
}
type SearchBookResult{
    id: ID!
    title: String
    description: String
    authors: [String]
    imageUrl(size:ImageSize=LARGE): String
    pageCount: Int
    subtitle: String
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
    reviews: [Review]
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

type Mutation{
    createReview(reviewInput:ReviewInput!):Review
    addBook(bookInput:BookInput!):Book
    addBookByBookId(googleBookId:String!):Book
}
input ReviewInput{
    bookId: ID!
    email:String!
    rating: Int!
    title: String!
    comment: String
    name: String!
}
input BookInput{
    googleBookId:ID!,
    title:String!
    subtitle:String
    description: String
    authors:[String!]
    pageCount: Int!
}
`

export default typeDefs