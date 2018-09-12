/**
 * Created by alond9990 on 12/09/2018.
 */

const pool = require('./mysql_connection');

function User() {

    // get specific user by credentials
    this.getUserByCredentials = async function (username, password) {
        let users = await pool.query("SELECT * FROM user WHERE username = '" + username + "' AND password = '" + password + "'");
        let user = users[0];
        delete  user['password'];
        return user;
    };

    // create new user
    this.createNewUser = async function (username, password) {
        return await pool.query("INSERT INTO user (username, password) VALUES ('" + username + "', '" + password + "')")
            .then(function(res) {
                return {
                    "id": res.insertId,
                    "username": username
                }
            })
            .catch(function(err) {
                return {
                    "error": err.sqlMessage
                }
            });
    };

}

module.exports = new User();