var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')


//main page 는 login이 될 때만(즉 세션정보가 있을때만) 접근이 가능하게 하자.
router.get('/', function(req,res) {
	res.render('monitoring.ejs',{
    title : 'CLOUDZ 모니터링'
  });
});
module.exports = router;
