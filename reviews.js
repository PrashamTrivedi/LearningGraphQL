import query from "./db.js"
const orderBy = {
    CREATED_AT_ASC: 'id',
    CREATED_AT_DESC: 'id desc'
}
export async function getAllReviews(args) {
    const orderByClause = orderBy[args.orderBy]

    const sql = `select * from hb.review order by ${orderByClause}`
    try {
        const result = await query(sql)
        return result?.rows
    } catch (err) {
        console.error(err)
        throw err

    }
}

