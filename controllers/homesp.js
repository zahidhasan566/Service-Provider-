var express = require('express');
var db = require('./../models/db.js');
var router = express.Router();











router.get('/', function(req, res){
	//console.log(userid);
	//res.render('homesp/index');
    var sql = "select * from user";
    db.getResults(sql, function(results){
        if(req.cookies['username'] != null){
        	var abc=req.cookies['userid'];
            res.render('homesp/index', {user: results[0],abc});
        }else{
            res.redirect('/login');
        }
    });
});

router.post('/', function(req, res){
	
	var sql = "select * from user where username='"+req.body.uname+"' and password='"+req.body.password+"'";
	
	db.getResults(sql, function(results){
		console.log(userid);
		if(results.length > 0){
			//req.session.un = req.body.uname;
			res.cookie('username', req.body.uname);
			res.redirect('/homesp');
		}else{
			res.send('invalid username/password');
		}
	});

});

module.exports = router;


