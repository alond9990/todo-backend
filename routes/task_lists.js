var express = require('express');
var router = express.Router();

/* GET task lists listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* CREATE task lists listing. */
router.post('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
