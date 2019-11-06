var express = require('express');
var userModel = require('./../models/user-model');

var router = express.Router();

router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', function(req, res){

	

	var user = {
		username: req.body.username,
		password: req.body.password
	}
console.log(user.username);
	userModel.validate(user, function(status,userid){

		 //if(status==1) {
			// req.session.username = req.body.userame;

			 //res.cookie('username', req.body.username);
			 //userModel.(req.session.username, function (result) {
				 //req.session.userid = result.userid;
				 //console.log(req.session.userid);
				 //res.cookie('username', req.body.username);
		if(status==1){
            res.cookie('username',req.body.username);
		res.cookie('userid',userid);
            //console.log(userid);


			// });
			 res.redirect('/homesp');
		 }

		//else if(status==2){
			//res.cookie('username', req.body.userame);
			//res.redirect('/home');
		//}
			else{
			res.send('invalid username/password');
		}
	});

});




module.exports = router;


