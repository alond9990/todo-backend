const express = require('express');
const router = express.Router();
const taskLists = require('../data_access/task_lists');

/* GET task lists listings */
router.get('/', async function(req, res, next) {
    let task_lists = await taskLists.getTaskListsByUser(1);
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
    let response = await taskLists.createTaskList(name);
    res.send(response);
});

/* grant permission to other user on a specific task list listing */
router.post('/:id/grant_permission', async function(req, res, next) {
    let user_ids = req.body.user_ids;
});

module.exports = router;
