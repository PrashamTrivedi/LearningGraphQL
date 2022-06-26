import {allBooks, imageUrl, getBookById, searchBook, addBook, addBookByGoogleId} from './book.js'
import {createReview, getAllReviews} from "./reviews.js"
const resolvers = {
    SearchBookResult: {
        imageUrl: (result, {size}) => imageUrl(size, result.id),
    },
    Book: {
        createdAt: book => book.created_at,
        ratingCount: book => book.rating_count,
        imageUrl: (book, {size}) => imageUrl(size, book.id),
        authors: (book, args, context) => {
            const {loaders} = context
            const {findAuthorsByBookIdsLoader} = loaders
            return findAuthorsByBookIdsLoader.load(book.id)
        },
        reviews: (book, args, context) => {
            const {loaders} = context
            const {findReviewsByIdsLoader} = loaders
            return findReviewsByIdsLoader.load(book.id)
        }
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
        },
        searchBook: (root, {searchQuery}, context) => {
            return searchBook(searchQuery)
        }
    },
    Mutation: {
        createReview: (root, args) => {
            const {reviewInput} = args
            return createReview(reviewInput)
        },
        addBook: (root, args) => {
            const {bookInput} = args
            return addBook(bookInput)
        },
        addBookByBookId: (root, args) => {
            const {googleBookId} = args
            return addBookByGoogleId(googleBookId)

        }
    }
}

export default resolvers