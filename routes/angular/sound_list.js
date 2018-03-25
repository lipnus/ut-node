var express = require('express')
var app = express()
var router = express.Router(); // 라우터처리
var path = require('path') // 상대경로
var mysql = require('mysql') //express에 가면 mysql연동 정보가 있음

// AWS RDS연결
var connection = mysql.createConnection({
	host : 'allthebeat.csygoyq4caou.ap-northeast-2.rds.amazonaws.com',
	port : 3306,
	user : 'allthebeat',
	password : '1q2w3e4r!',
	database : 'allthebeat'
})

connection.connect();



router.get('/', function(req, res){
  console.log("test.js GET")
  res.render('mainpage', {'testValue' : "sound_detail"})
});



router.post('/', function(req,res){

	//사용자의 아이디
	user_pk = req.body.user_pk;

	//음원리스트
	var sql = 'select sound_data.pk AS sound_pk, sound_data.sound_name, sound_data.sound_path, sound_data.bpm, user.nickname AS beatmaker_nickname, sound_data.img_path, sound_data.like_count from sound_data, user where sound_data.user_pk = user.pk';
	var factor = [];
	var query = connection.query(sql, factor, function(err, rows){
		if(err) throw err;

		var responseData = {};

		//추천리스트(5개)
		//==================================================
		// user_pk에 해당하는 추천목록을 선정하는 알고리즘추가
		//==================================================
		responseData.sound_recommend_list = [];
		for(var i=0; i<5; i++){
			var obj = {
				sound_pk: rows[i].sound_pk,
				sound_name: rows[i].sound_name,
				sound_path: rows[i].sound_path,
				sound_bpm: rows[i].bpm,
				beatmaker_nickname: rows[i].beatmaker_nickname,
				img_path: rows[i].img_path,
				like_count: 2,
				like_my: 0
			};
			responseData.sound_recommend_list.push(obj);
		}; //for


		//전체리스트
		responseData.sound_list = [];
		for(var i=0; i<rows.length; i++){
			var obj = {
				sound_pk: rows[i].sound_pk,
				sound_name: rows[i].sound_name,
				sound_path: rows[i].sound_path,
				sound_bpm: rows[i].bpm,
				beatmaker_nickname: rows[i].beatmaker_nickname,
				img_path: rows[i].img_path,
				like_count: 2,
				like_my: 0
			};
			responseData.sound_list.push(obj);
		}; //for


		res.json( responseData );

	});//sql-1
});//post


module.exports = router;