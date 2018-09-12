/**
 * Created by alond9990 on 12/09/2018.
 */

const config = require('../config');
const dbConfig = config.getDatabaseConfig();

const mysql = require('mysql');
const Promise = require("bluebird");

Promise.promisifyAll(mysql);
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

module.exports = class MySQLConnect {
    constructor() {
        this.pool = mysql.createPool({
            host     : process.env.MYSQL_HOST || dbConfig.host,
            user     : process.env.MYSQL_USER || dbConfig.user,
            password : process.env.MYSQL_PASSWORD || dbConfig.password,
            database: dbConfig.database,
            connectionLimit: dbConfig.connectionLimit
        });
    }

    getSqlConnection() {
        return this.pool.getConnectionAsync().disposer(connection => {
            connection.release();
        });
    }

    query(query_string, params) {
        return Promise.using(this.getSqlConnection(), connection => {
            // eslint-disable-next-line no-unused-vars
            return connection.queryAsync(query_string, params).then((rows, cols) => {
                if (rows.length) {
                    return rows;
                }
                return null;
            });
        });
    }

    shutDown() {
        return this.pool.endAsync();
    }

};