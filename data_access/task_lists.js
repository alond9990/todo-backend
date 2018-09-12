/**
 * Created by alond9990 on 12/09/2018.
 */

const pool = require('./mysql_connection');
const task = require('./tasks');

function TaskList() {

    const taskListTable = 'tasklist';

    // add tasks to list object
    async function _setListTask (task_list) {
        task_list.tasks = await task.getTasksByTaskListId(task_list.id);
        return task_list;
    }

    // get all task lists
    this.getTaskLists = async function () {
        let results = await pool.query("SELECT * FROM " + taskListTable);
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