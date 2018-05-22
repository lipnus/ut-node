var express = require('express')
var app = express()
var router = express.Router()

//선언
var android_group = require('./android/group');
var music = require('./usertest/music');
var answer = require('./usertest/answer');
var ranking = require('./usertest/ranking');







/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//라우터설정
router.use('/android/group', android_group);
router.use('/music', music);
router.use('/answer', answer);
router.use('/ranking', ranking);




module.exports = router;
