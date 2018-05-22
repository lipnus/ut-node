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

	let user_pk = req.body.user_pk;
	let music_pk = req.body.music_pk;
	let answer = req.body.answer;
	let try_count = req.body.try_count;

	//음원을 출제한다
	var sql = 'SELECT * FROM `music` WHERE pk=?';
	var factor = [music_pk];
	var query = connection.query(sql, factor, function(err, rows){
		if(err) throw err;

		let responseData = {result:"wrong", score:0};

		if(rows.length > 0){
			console.log("answer: " + answer + " / " + rows[0].music_name);
			if(answer == rows[0].music_name){
				responseData.result = "correct";

				if(try_count==1){ responseData.score=3; }
				else if(try_count == 2){ responseData.score=2; }
				else{ responseData.score=1;}
			}
		}//if


		res.json( responseData );

	});//sql
});//post


module.exports = router;
