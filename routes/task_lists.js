const express = require('express');
const router = express.Router();
const taskLists = require('../data_access/task_lists');
const usersDAL = require('../data_access/users');
const _ = require('lodash');

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
    let usersOld = await usersDAL.getUsersIdsByTaskList(taskListId, false);
    let usersNew = _.difference(req.body.user_ids, admins); // remove admin users from list
    // check which user to delete and which user to update
    let usersToDelete = _.difference(usersOld, usersNew);
    let usersToAdd = _.difference(usersNew, usersOld);
    // delete deleted task list users - if needed
    if (usersToDelete.length > 0) { await taskLists.deleteTaskListUsers(taskListId, usersToDelete); }
    // insert new users - if needed
    if (usersToAdd) { await taskLists.addUsersToTaskList(taskListId, usersToAdd, false); }
    res.send({});
});

module.exports = router;
