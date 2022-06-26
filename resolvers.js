import {getAuthorByBooks} from "./author.js"
import {allBooks, imageUrl} from './book.js'
import {getAllReviews} from "./reviews.js"
const resolvers = {
    Book: {
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
        books: () => {
            return allBooks()
        },
        reviews: () => {
            return getAllReviews()
        }
    }
}

export default resolvers