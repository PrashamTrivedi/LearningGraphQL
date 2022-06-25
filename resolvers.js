import {getAuthorByBooks} from "./author.js"
import {allBooks, imageUrl} from './book.js'
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
    Query: {
        books: () => {
            return allBooks()
        }
    }
}

export default resolvers