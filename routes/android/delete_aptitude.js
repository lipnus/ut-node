var express = require('express')
var app = express()
var router = express.Router()
var router = express.Router(); // 라우터처리
var path = require('path') // 상대경로
var mysql = require('mysql') //express에 가면 mysql연동 정보가 있음

//간단한 함수들을 모아놓음
var simpleFunction = require('./jsfile/simple_function');

// // // LOCAL DATABASE SETTING
// var connection = mysql.createConnection({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: '1111',
//   database: 'lipnus'
// })

// // AWS DATABASE SETTING
var connection = mysql.createConnection({
	host : 'hmtr-rds.cf3wzzk28tgn.ap-northeast-2.rds.amazonaws.com',
	port : 3306,
	user : 'humentory',
	password : 'humentory4132*',
	database : 'hmtr_db'
})


connection.connect();


router.get('/', function(req, res){
  console.log("test.js GET")
  // res.redirect('/test');
  res.render('android_user', {'testValue' : "안드로이드 - 유저"})
});


router.post('/', function(req,res){

	userinfo_pk = req.body.userinfo_pk;
 	responseData = {};

	var query = connection.query('DELETE FROM `raw_aptitude` WHERE user_fk=?', [userinfo_pk], function(err, rows) {
 	 if(err) throw err;

 	 responseData.result="success";
 	 res.json(responseData)
  })


})

module.exports = router;
