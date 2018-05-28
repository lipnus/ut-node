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

	//답안체크
	var sql = 'SELECT * FROM `music` WHERE pk=?';
	var factor = [music_pk];
	var query = connection.query(sql, factor, function(err, rows){
		if(err) throw err;

		let responseData = {result:"wrong", score:0};

		if(rows.length > 0){
			console.log("answer: " + answer + " / " + rows[0].music_name);

			if( rows[0].name_answer.indexOf(answer) != -1 ){
				responseData.result = "correct";

				if(try_count==1){ responseData.score=3; }
				else if(try_count == 2){ responseData.score=2; }
				else{ responseData.score=1;}

				//기록만 하고 따로 응답은 받지 않음
				sql = 'insert into history set ?';
				factor = {user_pk:user_pk, music_pk:music_pk,	answer:answer, try_count:try_count};
				query = connection.query(sql, factor, function(err,rows) {
					if(err) throw err;
				})//sql


				sql = 'UPDATE user SET nickname=?, mobile=?, sns=?, introduce=? WHERE token=?';
				factor = [nickname, mobile, sns, introduce, token];
				query = connection.query(sql, factor, function(err, rows){

					if(err) throw err;
					responseData.result="success";
					res.json( responseData );
				});

			}
		}//if


		res.json( responseData );

	});//sql
});//post


module.exports = router;
