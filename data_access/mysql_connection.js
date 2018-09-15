/**
 * Created by alond9990 on 12/09/2018.
 */

const config = require('../config');
const dbConfig = config.getDatabaseConfig();

const mysql = require('mysql');
const util = require("util");


const pool = mysql.createPool({
    host     : process.env.MYSQL_HOST || dbConfig.host,
    user     : process.env.MYSQL_USER || dbConfig.user,
    password : process.env.MYSQL_PASSWORD || dbConfig.password,
    database: dbConfig.database,
    connectionLimit: dbConfig.connectionLimit
});


pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        else if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        else if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
        else {
            console.log(err);
        }
    }
    if (connection) connection.release();
});

// Promisify for async/await.
pool.query = util.promisify(pool.query);

module.exports = pool;