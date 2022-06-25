import DataLoader from "dataloader"
import query from './db.js'


export async function getAuthorsByBooks(bookIds) {

  const authorMap = new Map()
  const sql = `select 
  hb.author.*,
  hb.book_author.book_id
    from hb.author inner join hb.book_author
    on hb.author.id = hb.book_author.author_id
  where hb.book_author.book_id = ANY($1);`

  const param = [bookIds]
  try {
    const result = await query(sql, param)

    return bookIds.map(id => result?.rows.filter(row => row.book_id === id))
  } catch (err) {
    console.error(err)
    throw err

  }
}

export function authorByBookIdLoader() {
  return new DataLoader(getAuthorsByBooks)
}
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