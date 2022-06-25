import query from './db.js'

export async function getAuthorByBooks(bookId) {

    const sql = `select 
  hb.author.*
    from hb.author inner join hb.book_author
    on hb.author.id = hb.book_author.author_id
  where hb.book_author.book_id = $1;`

    const param = [bookId]
    try {
        const result = await query(sql, param)
        return result?.rows
    } catch (err) {
        console.error(err)
        throw err

    }
}