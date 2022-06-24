import Pool from "pg"

const pool = new Pool.Pool({
    host: 'localhost',
    user: 'prasham',
    password: 'Det@2018!',
    database: 'hackerbook',
})

async function query(sql, params) {
    const client = await pool.connect()
    try {
        return await client.query(sql, params)
    } catch (error) {
        console.error(error)
    } finally {
        client.release()
    }
}

export default query