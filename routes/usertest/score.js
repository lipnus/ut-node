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
	let score = req.body.score;

	console.log("user_pk: " + user_pk + " / score: " + score );

	//점수를 올려줌
	sql = 'UPDATE user SET score=score+? where pk=?';
	factor = [score, user_pk];
	query = connection.query(sql, factor, function(err, rows){
		if(err) throw err;

		//순위를 알려줌
		var sql = 'SELECT (count(*)+1) AS rank FROM `user` WHERE score > (SELECT score FROM `user` WHERE pk=?)';
		var factor = [user_pk];
		var query = connection.query(sql, factor, function(err, rows){
			if(err) throw err;

			responseData = {};
			responseData.rank=rows[0].rank;
			console.log("랭킹: " + rows[0].rank);
			res.json( responseData );

		});//sql
	});//sql(update)
});//post


module.exports = router;
