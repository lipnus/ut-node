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


	if(music_pk > 0){
		//요청받은 음원정보 제공
		var sql = 'SELECT * FROM `music` WHERE pk=?';
		var factor = [music_pk];
	}else{
		//음원을 출제한다
		var sql = 'SELECT * FROM `music` WHERE 1';
		var factor = [];
	}

	var query = connection.query(sql, factor, function(err, rows){
		if(err) throw err;



		if(music_pk==0){ var i = Math.floor(Math.random() * rows.length) + 0;}
		else{var i=0;}


		responseData = {};
		console.log(i + "/ " + rows[i].pk);
		responseData.music_pk= rows[i].pk;
		responseData.music_name= rows[i].music_name;
		responseData.music_path= rows[i].music_path;
		responseData.youtube= rows[i].youtube;
		responseData.musician= rows[i].musician;
		responseData.album= rows[i].album;
		responseData.album_name= rows[i].album_name;
		responseData.date= rows[i].date;
		responseData.genre= rows[i].genre;

		res.json( responseData );

	});//sql
});//post


module.exports = router;
