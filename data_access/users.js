/**
 * Created by alond9990 on 12/09/2018.
 */

const pool = require('./mysql_connection');

function User() {

    const userTable = 'user';

    // get all users
    this.getAllUsers = async function () {
        let results = await pool.query("SELECT * FROM " + userTable);
        return results;
    };

    // get specific user by credentials
    this.getUserByUsername = async function (username) {
        let results = await pool.query("SELECT * FROM " + userTable + " WHERE username = ?", username);
        if (results.length > 0) {
            let user = results[0];
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