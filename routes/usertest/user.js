var express = require('express')
var app = express()
var router = express.Router(); // 라우터처리
var path = require('path') // 상대경로
var mysql = require('mysql') //express에 가면 mysql연동 정보가 있음

// mysql연결
var connection = mysql.createConnection({
	host : 'ec2-13-125-247-189.ap-northeast-2.compute.amazonaws.com',
	port : 3306,
	user : 'root',
	password : 'wptlel',
	database : 'usertest'
})

connection.connect();



router.get('/', function(req, res){
  console.log("test.js GET")
  res.render('mainpage', {'testValue' : "sound_list"})
});



router.post('/', function(req,res){

	let name = req.body.name;
	let nickname = req.body.nickname;
	let contact = req.body.contact;
	let age = req.body.age;

	sql = 'insert into user set ?';
	factor = {name:name, nickname:nickname,	contact:contact, age:age};
	query = connection.query(sql, factor, function(err,rows) {
		if(err) throw err;

		responseData={};
		responseData.result="success";
		res.json(responseData)
	})//sql

});//post


module.exports = router;
