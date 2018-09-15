/**
 * Created by alond9990 on 12/09/2018.
 */

const pool = require('./mysql_connection');
const task = require('./tasks');
const usersDAL = require('./users');
const config = require('../config');
const DB_TABLE_NAMES = config.getDBTableNames();

function TaskList() {

    const taskListTable = DB_TABLE_NAMES["tasklist"];
    const taskListUsersTable = DB_TABLE_NAMES["user_tasklist"];

    // add tasks to list object
    async function _setListTask (task_list) {
        task_list.tasks = await task.getTasksByTaskListId(task_list.id);
        return task_list;
    }

    // add admins to list object
    async function _setListAdmins (task_list) {
        task_list.admins = await usersDAL.getUsersIdsByTaskList(task_list.id, true);
        return task_list;
    }

    // add users to list object
    async function _setListUsers (task_list) {
        task_list.users = await usersDAL.getUsersIdsByTaskList(task_list.id, false);
        return task_list;
    }

    // get all task lists for a specific user
    this.getTaskListsByUser = async function (userId) {
        let results = await pool.query("Select T.id, T.name " +
            "From user U " +
            "Inner Join user_tasklist UT On UT.userID = U.id " +
            "Inner Join tasklist T On T.id = UT.taskListId " +
            "Where U.id = ?", userId);

        let addTasksToLists = results.map(_setListTask);
        let addAdminsToLists = results.map(_setListAdmins);
        let addUsersToLists = results.map(_setListUsers);
        let promises = addTasksToLists.concat(addAdminsToLists, addUsersToLists);
        await Promise.all(promises);

        return results
    };

    // get specific task list
    this.getTaskListById = async function (taskListId) {
        let results = await pool.query("SELECT * FROM " + taskListTable + " WHERE id = ?", taskListId);
        let task_list = _setListTask(results[0]);
        task_list = _setListAdmins(task_list);
        task_list = _setListUsers(task_list);
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

    // add a new users relation to task list
    this.addUsersToTaskList = async function (taskListId, user_ids, admin) {
        if (user_ids.length > 0) {
            let query = "INSERT INTO " + taskListUsersTable + " (taskListId, userId, admin) VALUES ";
            for (let i = 0, len = user_ids.length; i < len; i++) {
                query += "(" + taskListId + "," + user_ids[i] + "," + admin + ")";
                query += i === len - 1 ? ';' : ','
            }
            return await pool.query(query)
                .then(function(res) {
                    return {}
                })
                .catch(function(err) {
                    return {"error": err.sqlMessage}
                });
        }
    };

    // delete all of task list users
    this.deleteTaskListUsers = async function (taskListId, user_ids) {
        let inlist = '';
        for(let i=0; i<user_ids.length; i++) {
            inlist += i === user_ids.length - 1 ? '?' : '?,';
        }
        return await pool.query("DELETE FROM " + taskListUsersTable + " WHERE taskListId = ? AND userId IN (" + inlist + ")", [taskListId, user_ids])
            .then(function(res) {
                return {}
            })
            .catch(function(err) {
                return {"error": err.sqlMessage}
            });
    };



}

module.exports = new TaskList();