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

var nodePath = "http://ec2-13-125-247-189.ap-northeast-2.compute.amazonaws.com:9000";
var angularPath = "http://lipnus.com/#";

// var angularPath = "http://localhost:4200/#";
// var nodePath = "http://localhost:9000";


var client_id = '9OJNhWuG6yafwYhzTuE2';
var client_secret = '7lzbr2sQEP';
var state = "";
var redirectURI = encodeURI(nodePath + "/auth_naver");
var api_url = "";


var access_token;

//요청 테스트
router.get('/fuck', function(req, res){
	api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
   res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
   res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
});



//콜백
router.get('/', function (req, res) {
    code = req.query.code;
    state = req.query.state;

		console.log("네이버");
    res.redirect("http://https://www.instagram.com/");
});



router.post('/', function(req,res){
	console.log(req + " / " + res);
});//post


module.exports = router;
