import {authorByBookIdLoader} from "./author.js"

export default () => ({
    findAuthorsByBookIdsLoader: authorByBookIdLoader(),

})