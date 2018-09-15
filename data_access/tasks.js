/**
 * Created by alond9990 on 12/09/2018.
 */

const pool = require('./mysql_connection');
const config = require('../config');
const DB_TABLE_NAMES = config.getDBTableNames();

function Task() {

    const taskTable = DB_TABLE_NAMES["task"];

    // create new task list
    this.createTask = async function (title, taskListId) {
        let task = {
            "title": title,
            "done": false,
            "taskListId": taskListId
        };
        return await pool.query("INSERT INTO " + taskTable + " SET ? ", task)
            .then(function(res) {
                return {}
            })
            .catch(function(err) {
                return {
                    "error": err.sqlMessage
                }
            });
    };

    // mark task as done
    this.markTaskAsDone = async function (taskId) {
        return await pool.query("UPDATE " + taskTable + " SET done = ? WHERE id = ?", [true, taskId])
            .then(function(res) {
                return {} //todo
            })
            .catch(function(err) {
                return {
                    "error": err.sqlMessage
                }
            });
    };

    // get tasks that belongs to a specific task list
    this.getTasksByTaskListId = async function (taskListId) {
        let results = await pool.query("SELECT * FROM " + taskTable + " WHERE taskListId = ?", taskListId);
        return results;

    };

}

module.exports = new Task();