/**
 * Created by alond9990 on 12/09/2018.
 */

const pool = require('./mysql_connection');

function User() {

    const userTable = 'user';
    const taskListUsersTable = 'user_tasklist';

    // get all users
    this.getAllUsers = async function () {
        let results = await pool.query("SELECT id, username FROM " + userTable);
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

    // get all users for a specific list
    this.getUsersIdsByTaskList = async function (taskListId, admin) {
        let query = "SELECT userId FROM " + taskListUsersTable + " WHERE taskListId = ?";
        if (admin === true || admin === false) {
            query += " AND admin = ?"
        }
        let results = await pool.query(query,
            [taskListId, admin]);
        let user_ids = results.map(function(item) {
            return item.userId;
        });
        return user_ids
    };

}

module.exports = new User();