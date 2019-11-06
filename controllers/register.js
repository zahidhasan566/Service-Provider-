var express = require('express');
var db = require('./../models/db.js');
var userModel = require('./../models/register');
var router = express.Router();
router.get('*', function (req, res, next) {

	if (req.cookies['username'] != null) {
		next();
	} else {
		res.redirect('/login');
	}
});









router.get('/', function(req, res){
		res.render('register/register');		
});




router.post('/servicereg', function(req, res){
	
	var user = {
		username: req.body.username,
		email: req.body.email,
		phone: req.body.phone,
		password: req.body.password,
		gender: req.body.gender,
		city: req.body.city,
		skill: req.body.skill
	}
	

	
	console.log(user.username, user.email, user.city, user.phone, user.password, user.gender);

	userModel.registersp(user, function(status){
		
		if(status){
			var sql = "select * from user where phone="+user.phone;
		db.getResults(sql, function(results){
			console.log(results[0].userid);
			console.log(user.skill);
				var sql =" insert into serviceprovider values('','" + results[0].userid + "', '" + user.skill + "', '')";
				db.execute(sql, function(status){
					if(status){
						res.redirect('/login');
					} else{}
				});
		});
			
		}else{
			res.send('invalid username /password');
		}
	});

});

router.post('/customerreg', function(req, res){
	
	var user = {
		username: req.body.username,
		email: req.body.email,
		phone: req.body.phone,
		password: req.body.password,
		gender: req.body.gender,
		city: req.body.city,
		location: req.body.location
	}
	

	
	console.log(user.username, user.email, user.city, user.phone, user.password, user.gender);

	userModel.registercp(user, function(status){
		
		if(status){
			var sql = "select * from user where phone="+user.phone;
		db.getResults(sql, function(results){
			console.log(results[0].userid);
			console.log(user.location);
				var sql =" insert into customer values('','" + results[0].userid + "', '" + user.location + "', '')";
				db.execute(sql, function(status){
					if(status){
						res.redirect('/login');	
					} else{}
				});
		});
			
		}else{
			res.send('invalid username/password');
		}
	});

});




module.exports = router;
