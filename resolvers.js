import {allBooks, imageUrl, getBookById} from './book.js'
import {getAllReviews} from "./reviews.js"
const resolvers = {
    Book: {
        createdAt: book => book.created_at,
        ratingCount: book => book.rating_count,
        imageUrl: (book, {size}) => imageUrl(size, book.id),
        authors: (book, args, context) => {
            const {loaders} = context
            const {findAuthorsByBookIdsLoader} = loaders
            return findAuthorsByBookIdsLoader.load(book.id)
            // return testLoad
            // getAuthorByBooks(book.id)},
        },
    },
    Review: {
        createdAt: review => review.created_at,
        books: (review, args, context) => {
            const {loaders} = context
            const {findBooksByIdsLoader} = loaders
            return findBooksByIdsLoader.load(review.book_id)
        },
        users: (review, args, context) => {
            const {loaders} = context
            const {findUsersByIdsLoader} = loaders
            return findUsersByIdsLoader.load(review.user_id)
        }

    },
    Query: {
        books: (root, args) => {
            return allBooks(args)
        },
        reviews: (root, args) => {
            return getAllReviews(args)
        },
        book: (root, {id}, context) => {
            return getBookById(id)
        }
    }
}

export default resolvers