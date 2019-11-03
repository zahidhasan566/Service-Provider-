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

router.get('/profile', function(req, res){

	userModel.getprofile(function(results){

		res.render('admin/profile', {user: results});		
	});

});




router.get('/update/:id', function(req, res){

	userModel.getupdate(req.params.id, function(results){
		res.render('admin/updateprofile', {user: results});		
	});

});

router.post('/update/:id', function(req, res){
	
	var user = {
		username: req.body.username,
		phone: req.body.phone,
		password: req.body.password,
		email: req.body.email,
		gender: req.body.gender,
		city: req.body.city,
		id: req.params.id
	};

	

	userModel.update(user, function(status){
		console.log(status);
		if(status){
			res.redirect('/admin/profile');
		}else{
			res.redirect('/adminhome');
		}
	});
});
router.get('/details/:id', function(req, res){

	userModel.getById(req.params.id, function(result){
		res.render('/user/details', {user: result});
	});
});

module.exports = router;
