var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express backend' , db: 'Postgres database'});
});

router.post('/', function(req, res, next) {
  console.log('We posted!');
  // res.console('We posted!');
});

module.exports = router;
