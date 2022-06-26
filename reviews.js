import DataLoader from "dataloader"
import query from "./db.js"
const orderBy = {
    CREATED_AT_ASC: 'id',
    CREATED_AT_DESC: 'id desc'
}

export async function getReviewByBookIds(bookIds) {
    const sql = `select * from hb.review where hb.review.book_id=ANY($1)`
    const params = [bookIds]
    try {
        const result = await query(sql, params)

        const retVal = bookIds.map(id => result?.rows.filter(row => row.book_id == id))
        return retVal
    } catch (err) {
        console.error(err)
        throw err
    }
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


export function reviewsByIdLoader() {
    return new DataLoader(getReviewByBookIds)
}