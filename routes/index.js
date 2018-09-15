const express = require('express');
const router = express.Router();
const userDAL = require('../data_access/users');
const bcrypt = require('bcrypt');
const auth_helpers = require('../helpers/auth');

const expressJoi = require('express-joi-validator');
const validations = require('./validations/index');

/* GET home page */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* Verify token endpoint */
router.get('/verify', function(req, res, next) {
    res.status(200).send({});
});

/* LOGIN endpoint */
router.post('/login',expressJoi(validations.validateLogin), async function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    await userDAL.getUserByUsername(username)
        .then(function(user) {
            let error = {"error": "No user matching credentials."};
            if (user) {
                bcrypt.compare(password, user.password, function(err, result) {
                    if (result) {
                        delete user.password;
                        user['token'] = auth_helpers.generateToken(user);
                        res.send(user);
                    }
                    else {
                        res.status(401).send(error);
                    }
                });
            }
            else {
                res.status(401).send(error);
            }
        });
});

/* REGISTER endpoint */
router.post('/register', expressJoi(validations.registerLogin), function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    // hash the password
    bcrypt.hash(password, 10, async function(err, hash) {
        if(err) {
            return res.status(400).send({"error": err})
        }
        password = hash;
        try {
            let user = await userDAL.createNewUser(username, password);
            res.send(user);
        }
        catch (e) {
            res.status(400).send({"error": e.message});
        }
    });
});

module.exports = router;
