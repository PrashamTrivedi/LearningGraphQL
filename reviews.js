import query from "./db.js"

export async function getAllReviews() {
    const sql = `select * from hb.review`
    try {
        const result = await query(sql)
        return result?.rows
    } catch (err) {
        console.error(err)
        throw err

    }
}

