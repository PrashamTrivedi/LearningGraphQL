import {allBooks} from './book.js'
const resolvers = {
    Book: {

    },
    Query: {
        books: () => {
            return allBooks()
        }
    }
}

export default resolvers