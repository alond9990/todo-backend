const Joi = require('joi');

const create = {
    body: {
        name: Joi.string().min(3).max(256).required(),
    }
};

const updateUsers = {
    body: {
        user_ids: Joi.array().required(),
    },
    params: {
        id: Joi.number().integer().required(),
    }
};

const getOne = {
    params: {
        id: Joi.number().integer().required(),
    }
};

module.exports = {
    getOne: getOne,
    create: create,
    updateUsers: updateUsers
};