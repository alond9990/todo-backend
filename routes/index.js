const express = require('express');
const router = express.Router();
const user = require('../data_access/users');

/* GET home page */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* LOGIN endpoint */
router.post('/login', async function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let user = await user.getUserByCredentials(username, password);
    if (user) {
        res.send(user);
    } else {
        res.send({"error": "No user matching credentials."});
    }

});

/* REGISTER endpoint */
router.post('/register', async function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let response = await user.createNewUser(username, password);
    res.send(response);
});

module.exports = router;
