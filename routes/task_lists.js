const express = require('express');
const router = express.Router();
const taskLists = require('../data_access/task_lists');

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
    await taskLists.addUsersToTaskList(newTaskList.id, [adminUserId], true);
    res.send(newTaskList);
});

/* grant permission to other user on a specific task list listing */
router.post('/:id/grant_permission', async function(req, res, next) {
    let taskListId = req.params.id;
    let user_ids = req.body.user_ids;
    let response = await taskLists.addUsersToTaskList(taskListId, user_ids, false);
    res.send(response);
});

module.exports = router;
