var express = require('express');
var userModel = require('./../models/admin');
var router = express.Router();

router.get('/serviceprovider', function(req, res){

		userModel.getprovider(function(results){
			
				res.render('admin/serviceprovider', {user: results});
			
		});
});

router.get('/providerinfo/:id', function(req, res){

	userModel.getById(req.params.id, function(results){

		res.render('admin/providerinfo', {user: results});		
	});

});




router.post('/edit/:id', function(req, res){
	
	var user = {
		username: req.body.username,
		password: req.body.password,
		id: req.params.id
	};

	userModel.update(user, function(status){

		if(status){
			res.redirect('/user/userlist');
		}else{
			res.redirect('/user/adduser');
		}
	});
});

router.get('/details/:id', function(req, res){

	userModel.getById(req.params.id, function(result){
		res.render('/user/details', {user: result});
	});
});

module.exports = router;
