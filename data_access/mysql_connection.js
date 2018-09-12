/**
 * Created by alond9990 on 12/09/2018.
 */

// establish Mysql Connection
const mysql = require('mysql');
const config = require('../config');
const dbConfig = config.getDatabaseConfig();

function MySQLConnect() {

    this.pool = null;

    // Init MySql Connection Pool
    this.init = function() {
        this.pool = mysql.createPool({
            host     : process.env.MYSQL_HOST || dbConfig.host,
            user     : process.env.MYSQL_USER || dbConfig.user,
            password : process.env.MYSQL_PASSWORD || dbConfig.password,
            database: dbConfig.database,
            connectionLimit: dbConfig.connectionLimit
        });
    };

    // acquire connection and execute query on callbacks
    this.acquire = function(callback) {

        this.pool.getConnection(function(err, connection) {
            callback(err, connection);
        });

    };

}

module.exports = new MySQLConnect();