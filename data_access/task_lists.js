/**
 * Created by alond9990 on 12/09/2018.
 */

const pool = require('./mysql_connection');
const task = require('./tasks');

function TaskList() {

    const taskListTable = 'tasklist';
    const taskListUsersTable = 'user_tasklist';

    // add tasks to list object
    async function _setListTask (task_list) {
        task_list.tasks = await task.getTasksByTaskListId(task_list.id);
        return task_list;
    }

    // get all task lists for a specific user
    this.getTaskListsByUser = async function (userId) {
        let results = await pool.query("Select T.id, T.name " +
            "From user U " +
            "Inner Join user_tasklist UT On UT.userID = U.id " +
            "Inner Join tasklist T On T.id = UT.taskListId " +
            "Where U.id = ?", userId);
        const promises = results.map(_setListTask);
        await Promise.all(promises);
        return results
    };

    // get specific task list
    this.getTaskListById = async function (taskListId) {
        let results = await pool.query("SELECT * FROM " + taskListTable + " WHERE id = ?", taskListId);
        let task_list = _setListTask(results[0]);
        return task_list;

    };

    // create new task list
    this.createTaskList = async function (name) {
        return await pool.query("INSERT INTO " + taskListTable + " SET ?", {"name": name})
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

    // add a new admin user relation to task list
    this.addAdminToTaskList = async function (taskListId, userId) {
        return await pool.query("INSERT INTO " + taskListUsersTable + " SET ?",
            {"userId": userId, "taskListId": taskListId, "admin": true})
            .then(function(res) {
                return {

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