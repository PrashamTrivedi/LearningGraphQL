import query from './db.js'

export async function allBooks() {
    const sql = `select * from hb.books`
    try {
        const result = await query(sql)
        return result?.rows
    } catch (err) {
        console.error(err)
        throw err

    }

}