import DataLoader from "dataloader"
import query from './db.js'

export async function allBooks() {
    const sql = `select * from hb.book`
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

        return bookIds.map(id => result?.rows.filter(row => row.id === id))
    } catch (err) {
        console.error(err)
        throw err

    }
}

export function booksByIdsLoader() {
    return new DataLoader(getAllBooksFromIds)
}


export function imageUrl(size, id) {
    const zoom = size === 'SMALL' ? 1 : 0
    return `//books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=${zoom}&source=gbs_api`
}