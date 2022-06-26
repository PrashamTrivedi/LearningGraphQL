import DataLoader from "dataloader"
import query from './db.js'

export async function allUsers() {
    const sql = `select * from hb.user`
    try {
        const result = await query(sql)
        return result?.rows
    } catch (err) {
        console.error(err)
        throw err

    }

}

export async function getAllUsersFromIds(userIds) {
    const sql = `
    select * from hb.user where hb.user.id=ANY($1)
    `

    const params = [userIds]
    try {
        const result = await query(sql, params)

        return userIds.map(id => result?.rows.filter(row => row.id === id))
    } catch (err) {
        console.error(err)
        throw err

    }
}

export function usersByIdsLoader() {
    return new DataLoader(getAllUsersFromIds)
}

