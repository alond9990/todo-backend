const express = require('express');
const router = express.Router();
const user = require('../data_access/users');
const bcrypt = require('bcrypt');

/* GET home page */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* LOGIN endpoint */
router.post('/login', async function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    await user.getUserByUsername(username)
        .then(function(user) {
            if (user) {
                bcrypt.compare(password, user.password, function(err, result) {
                   if (result) {
                       res.send(user);
                   }
                });
            }
            res.status(401).send({"error": "No user matching credentials."});
        });
});

/* REGISTER endpoint */
router.post('/register', async function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    // hash the password
    bcrypt.hash(password, 10, function(err, hash) {
        if(err) {
            return res.status(400).send({"error": err})
        }
        password = hash;
    });
    try {
        let user = await user.createNewUser(username, password);
        res.send(user);
    }
    catch (e) {
        res.status(400).send({"error": e.message});
    }
});

module.exports = router;
