import {allBooks, imageUrl} from './book.js'
const resolvers = {
    Book: {
        ratingCount: book => book.rating_count,
        imageUrl: (book, {size}) => imageUrl(size, book.id)
    },
    Query: {
        books: () => {
            return allBooks()
        }
    }
}

export default resolvers