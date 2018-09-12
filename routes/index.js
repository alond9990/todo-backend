const express = require('express');
const router = express.Router();
const user = require('../data_access/users');

/* GET home page */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* LOGIN endpoint */
router.post('/login', async function(req, res, next) {
    var a = await user.getUserByCredentials('alond9990', '123456');
    res.send(a);
});

module.exports = router;
