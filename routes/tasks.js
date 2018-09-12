const express = require('express');
const router = express.Router();
const task = require('../data_access/tasks');

/* CREATE task listing. */
router.post('/', async function(req, res, next) {
    let title = req.body.title;
    let taskListId = req.body.taskListId;
    let response = await task.createTask(title, taskListId);
    res.send(response);
});

/* Mark task as done */
router.put('/done', async function(req, res, next) {
    let taskId = req.body.taskId;
    let response = await task.markTaskAsDone(taskId);
    res.send(response);
});

module.exports = router;
