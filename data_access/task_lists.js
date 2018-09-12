/**
 * Created by alond9990 on 12/09/2018.
 */

const pool = require('./mysql_connection');

function TaskList() {

    const taskListTable = 'tasklist';

    function serializeListWithTasks(results) {
        if (results.length > 0) {
            let taskList = {
                "id": results[0].id,
                "name": results[0].name,
                "tasks": []
            };
            results.forEach(function(result) {
                if (result.task_id) {
                    taskList.tasks.push({"id": result.task_id, "title": result.title, "done": !!result.done});
                }
            });
            return taskList;
        }
    }

    // get all task lists
    this.getTaskLists = async function () {
        return await pool.query("SELECT * FROM " + taskListTable);
    };

    // get specific task list
    this.getTaskListById = async function (taskListId) {
        let results = await pool.query("SELECT TL.id AS id, TL.name AS name,T.title AS title ,T.ID AS task_id, T.done AS done " +
            "FROM " + taskListTable + " TL LEFT JOIN task T ON TL.id = T.taskListId WHERE TL.id = '" + taskListId + "'");
        return serializeListWithTasks(results);

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