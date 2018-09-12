var express = require('express');
var router = express.Router();

/* CREATE tasks listing. */
router.post('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Mark task as done */
router.put('/done', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
