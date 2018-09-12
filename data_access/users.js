/**
 * Created by alond9990 on 12/09/2018.
 */

var connection = require('./mysql_connection');

function User() {

    // get specific user by credentials
    this.getUserByCredentials = function (username, password) {
        // initialize database connection
        connection.init();
        connection.acquire(function (err, con) {
            con.query("SELECT * FROM user WHERE username = '" + username + "' AND password = '" + password + "'",
                function (err, result) {
                    con.release();
                    console.log(result);
                    return result;
                });
        });
    };

}

module.exports = new User();