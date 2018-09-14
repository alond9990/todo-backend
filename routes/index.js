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
    await user.getUserByCredentials(username, password)
        .then(function(user) {
            if (user) {
                res.send(user);
            } else {
                res.status(404).send({"error": "No user matching credentials."});
            }
        });
});

/* REGISTER endpoint */
router.post('/register', async function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    try {
        let user = await user.createNewUser(username, password);
        res.send(user);
    }
    catch (e) {
        res.status(400).send({"error": e.message});
    }
});

module.exports = router;
