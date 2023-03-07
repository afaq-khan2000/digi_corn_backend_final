var express = require('express');
var router = express.Router();
const constants = require('../public/Constants/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { constants: constants });
});

module.exports = router;
