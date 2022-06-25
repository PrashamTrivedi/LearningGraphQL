import Pool from "pg"

const pool = new Pool.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'hackerbook',
})

async function query(sql, params) {
    const client = await pool.connect()
    try {
        console.log(sql)
        const dbResponse = await client.query(sql, params)
        console.log({rows: dbResponse.rows, rowCount: dbResponse.rowCount})
        return dbResponse
    } catch (error) {
        console.error(error)
    } finally {
        client.release()
    }
}

export default query