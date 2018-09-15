const express = require('express');
const router = express.Router();
const usersDAL = require('../data_access/users');


/* GET task lists listings */
router.get('/', async function(req, res, next) {
    let users = await usersDAL.getAllUsers();
    res.send(users);
});

module.exports = router;
