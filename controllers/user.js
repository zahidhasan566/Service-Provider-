var express = require('express');
var db = require('./../models/db.js');
var router = express.Router();

router.get('/userlist', function(req, res){

		var sql = "select * from user";
		db.getResults(sql, function(results){
			if(req.cookies['username'] != null){
				res.render('user/index', {user: results});
			}else{
				res.redirect('/login');
			}
		});
});


router.get('/adduser', function(req, res){
	res.render('user/adduser');
});

router.post('/adduser', function(req, res){
	var sql = "insert into user values('','"+ req.body.username+"', '"+req.body.pass+"')";
	db.execute(sql, function(status){

		if(status){
			res.redirect('/user/userlist');
		}else{
			res.redirect('/user/adduser');
		}
	});
});

router.get('/edit/:id', function(req, res){

	var sql = "select * from user where id="+req.params.id;
	db.getResults(sql, function(results){

		res.render('user/edit', {user: results[0]});		
	});

});

router.post('/edit/:id', function(req, res){
	var sql = "update user set username='"+ req.body.username+"', password='"+req.body.pass+"' where id="+req.params.id;
	db.execute(sql, function(status){

		if(status){
			res.redirect('/user/userlist');
		}else{
			res.redirect('/user/adduser');
		}
	});
});

module.exports = router;


