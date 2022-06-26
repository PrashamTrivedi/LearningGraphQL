import {authorByBookIdLoader} from "./author.js"
import {booksByIdsLoader} from "./book.js"
import {reviewsByIdLoader} from "./reviews.js"
import {usersByIdsLoader} from "./users.js"

export default () => ({
    findAuthorsByBookIdsLoader: authorByBookIdLoader(),
    findBooksByIdsLoader: booksByIdsLoader(),
    findUsersByIdsLoader: usersByIdsLoader(),
    findReviewsByIdsLoader: reviewsByIdLoader()
})