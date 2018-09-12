/**
 * Created by alond9990 on 12/09/2018.
 */

const pool = require('./mysql_connection');

function TaskList() {

    const taskListTable = 'tasklist';

    // get all task lists
    this.getTaskLists = async function () {
        return await pool.query("SELECT * FROM " + taskListTable);
    };

    // get specific task list
    this.getTaskListById = async function (taskListId) {
        let results = await pool.query("SELECT * FROM " + taskListTable + " WHERE id = '" + taskListId);
        return results[0];

    };

    // create new task list
    this.createTaskList = async function (name) {
        return await pool.query("INSERT INTO " + taskListTable + " (name) VALUES ('" + name + "')")
            .then(function(res) {
                return {
                    "id": res.insertId,
                    "name": name
                }
            })
            .catch(function(err) {
                return {
                    "error": err.sqlMessage
                }
            });
    };

}

module.exports = new TaskList();