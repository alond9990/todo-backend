const Joi = require('joi');

const create = {
    body: {
        title: Joi.string().min(3).max(256).required(),
        taskListId: Joi.number().integer().required()
    }
};

const markAsDone = {
    params: {
        taskId: Joi.number().integer().required(),
    }
};

module.exports = {
    create: create,
    markAsDone: markAsDone
};