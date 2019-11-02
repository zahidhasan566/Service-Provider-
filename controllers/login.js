var express = require('express');
var userModel = require('./../models/user-model');

var router = express.Router();

router.get('/', function (req, res) {
	res.render('login/index');
});

router.post('/', function (req, res) {



	var user = {
		username: req.body.username,
		password: req.body.password
	}
	//console.log(user.username);
	userModel.validate(user, function (status) {

		if (status == 1) {

			req.session.username = req.body.username;
			res.redirect('/home');
			userModel.getId(req.session.username, function (result) {
				req.session.userid = result[0].userid;
				console.log(req.session.userid);

				//console.log(req.cookie['userid']);
			});
		}
		else if (status == 4) {
			req.session.username = req.body.username;
			userModel.getId(req.session.username, function (result) {
				req.session.userid = result[0].userid;
				console.log(req.session.userid);

				//console.log(req.cookie['userid']);
			});

			res.redirect('/adminhome');
		} else if (status == 2) {
			req.session.username = req.body.username;
			userModel.getId(req.session.username, function (result) {
				//	console.log(result[0].userid);
				req.session.userid = result[0].userid;
				console.log(req.session.userid);

				//console.log(req.cookie['userid']);
			});
			res.redirect('/customer');
		}
		else {

			res.send('invalid username/password');
		}


	});


});




module.exports = router;


