/**
 * Created by alond9990 on 12/09/2018.
 */

const pool = require('./mysql_connection');

function User() {

    const userTable = 'user';

    // get specific user by credentials
    this.getUserByCredentials = async function (username, password) {
        let results = await pool.query("SELECT * FROM " + userTable + " WHERE username = ? AND password = ?", [username, password]);
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
        return await pool.query("INSERT INTO " + userTable + " SET ?", {"username": username, "password": password})
            .then(function(res) {
                return {
                    "id": res.insertId,
                    "username": username
                }
            })
            .catch(function(err) {
                throw new Error(err.sqlMessage);
            });
    };

}

module.exports = new User();