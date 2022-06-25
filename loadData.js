import Pool from "pg"
import fs from "fs"

const pool = new Pool.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
})

export async function loadData() {
    const client = await pool.connect()
    const createDbSql = readSqlFile('./database/create_db.sql').split(';\n')
    await executeQueries(createDbSql, client)
    const schemaSql = readSqlFile('./database/schema.sql').split(';\n')
    await executeQueries(schemaSql, client)
    const loadDataSql = readSqlFile('./database/load_data.sql').split(';\n')
    await executeQueries(loadDataSql, client)
    return



}


async function executeQueries(createDbSql, client) {
    for await (const sql of createDbSql) {
        try {

            console.log(sql)
            await client.query(sql)
        } catch (error) {
            console.error(error)
        }
    }
}

function readSqlFile(fileName) {
    var sql = fs.readFileSync(fileName).toString()
    return sql

}


await loadData()