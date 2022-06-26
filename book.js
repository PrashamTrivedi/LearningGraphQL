import axios from "axios"
import DataLoader from "dataloader"
import query from './db.js'

const orderBy = {
    RATING_DESC: 'rating desc',
    CREATED_AT_DESC: 'created_at desc',
    CREATED_AT_ASC: 'created_at'
}
export async function allBooks(args) {
    const orderByClause = orderBy[args.orderBy]
    const sql = `select * from hb.book order by ${orderByClause}`
    try {
        const result = await query(sql)
        return result?.rows
    } catch (err) {
        console.error(err)
        throw err

    }

}

export async function getAllBooksFromIds(bookIds) {
    const sql = `
    select * from hb.book where hb.book.id=ANY($1)
    `

    const params = [bookIds]
    try {
        const result = await query(sql, params)

        const retVal = bookIds.map(id => result?.rows.filter(row => row.id == id))
        return retVal
    } catch (err) {
        console.error(err)
        throw err
    }
}
export async function searchBook(searchQuery) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}`

    try {
        const result = await axios(url)
        const items = result.data.items
        const searchBookResponse = items.map(item => {
            const response = {}
            response.id = item.id
            console.log(JSON.stringify(item))

            response.title = item?.volumeInfo?.title
            response.authors = item?.volumeInfo?.authors
            response.description = item?.volumeInfo?.description
            response.pageCount = item?.volumeInfo?.pageCount
            response.subtitle = item?.volumeInfo?.subtitle
            return response
        })
        return searchBookResponse

    } catch (error) {
        console.error(error)
        throw error
    }

}
export function booksByIdsLoader() {
    return new DataLoader(getAllBooksFromIds)
}

export async function getBookById(bookId) {
    const sql = `select * from hb.book where id=$1`
    const params = [bookId]
    try {
        const result = await query(sql, params)
        return result?.rows[0]
    } catch (err) {
        console.error(err)
        throw err

    }
}

export async function addBook(bookInput) {
    const {googleBookId, title, subtitle, description, authors, pageCount} = bookInput
    const sql = `select * from hb.create_book($1,$2,$3,$4,$5,$6)`
    const params = [googleBookId, title, subtitle, description, authors, pageCount]
    try {
        const result = await query(sql, params)
        return result?.rows[0]
    } catch (err) {
        console.error(err)
        throw err

    }
}

export function imageUrl(size, id) {
    const zoom = size === 'SMALL' ? 1 : 0
    return `//books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=${zoom}&source=gbs_api`
}
export async function addBookByGoogleId(googleBookId) {
    const bookById = await getBookByGoogleID(googleBookId)
    console.log(bookById)
    return await addBook(bookById)
}
async function getBookByGoogleID(googleBookId) {
    const url = `https://www.googleapis.com/books/v1/volumes/${googleBookId}`
    console.log(url)
    try {
        const result = await axios(url)
        const item = result.data
        console.log(item)
        const bookResponse = {}
        bookResponse.id = item?.id
        bookResponse.googleBookId = item?.id
        console.log(JSON.stringify(item))

        bookResponse.title = item?.volumeInfo?.title
        bookResponse.authors = item?.volumeInfo?.authors
        bookResponse.description = item?.volumeInfo?.description
        bookResponse.pageCount = item?.volumeInfo?.pageCount
        bookResponse.subtitle = item?.volumeInfo?.subtitle
        return bookResponse

    } catch (error) {
        console.error(error)
        throw error
    }

}