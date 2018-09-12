/**
 * Created by alond9990 on 12/09/2018.
 */

const pool = require('./mysql_connection');

function User() {

    const userTable = 'user';

    // get specific user by credentials
    this.getUserByCredentials = async function (username, password) {
        let results = await pool.query("SELECT * FROM " + userTable + " WHERE username = '" + username + "' AND password = '" + password + "'");
        if (results.length > 0) {
            let user = results[0];
            delete  user['password'];
            return user;
        } else {
            return null;
        }
    };

    // create new user
    this.createNewUser = async function (username, password) {
        return await pool.query("INSERT INTO " + userTable + " (username, password) VALUES ('" + username + "', '" + password + "')")
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