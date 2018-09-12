const express = require('express');
const router = express.Router();
const taskLists = require('../data_access/task_lists');

/* GET task lists listings */
router.get('/', async function(req, res, next) {
    return await taskLists.getTaskLists();
});

/* GET specific task list listing */
router.get('/:id', async function(req, res, next) {
    let taskListId = req.params.id;
    return await taskLists.getTaskListById(taskListId);
});

/* CREATE task list listing. */
router.post('/', async function(req, res, next) {
    let name = req.body.name;
    let response = await taskLists.createTaskList(name);
    res.send(response);
});

module.exports = router;
