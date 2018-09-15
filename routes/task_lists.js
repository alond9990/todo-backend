const express = require('express');
const router = express.Router();
const taskLists = require('../data_access/task_lists');
const usersDAL = require('../data_access/users');

/* GET task lists listings */
router.get('/', async function(req, res, next) {
    let user_id = req.user.id;
    let task_lists = await taskLists.getTaskListsByUser(user_id);
    res.send(task_lists);
});

/* GET specific task list listing */
router.get('/:id', async function(req, res, next) {
    let taskListId = req.params.id;
    let task_list = await taskLists.getTaskListById(taskListId);
    res.send(task_list);
});

/* CREATE task list listing */
router.post('/', async function(req, res, next) {
    let name = req.body.name;
    let adminUserId = req.user.id;
    // create new task list
    let newTaskList = await taskLists.createTaskList(name);
    // add new admin to new task list
    await taskLists.addUsersToTaskList(newTaskList.id, [{"id": adminUserId, "admin": true}]);
    res.send(newTaskList);
});

/* grant permission to other user on a specific task list listing */
router.put('/:id/users', async function(req, res, next) {
    let taskListId = req.params.id;
    // get task list's admins
    let admins = await usersDAL.getUsersIdsByTaskList(taskListId, true);
    // organize task list new users
    let users = req.body.user_ids.map(function(userId) {
        return {
            "id": userId,
            "admin": admins.indexOf(userId) !== -1
        }
    });
    // delete all task list users
    let deleteUsers = await taskLists.deleteTaskListUsers(taskListId);
    // re-insert all of the updated users
    let addUsers = await taskLists.addUsersToTaskList(taskListId, users);
    res.send(addUsers);
});

module.exports = router;
