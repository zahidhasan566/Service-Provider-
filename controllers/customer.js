var express = require('express');
var userModel = require('./../models/customer-model');
var serviceModel = require('./../models/serviceprovider');

var router = express.Router();

router.get('/', function (req, res) {
    res.render('customer-home/index.ejs');
});


router.get('/appointment', function (req, res) {
    res.render('appointment/index.ejs');
});

router.get('/serviceprovider', function(req, res){

    userModel.getprovider(function(results){
        
            res.render('customer-home/serviceprovider', {user: results});
        
    });
});

router.get('/providerinfo/:id', function(req, res){

	userModel.getById(req.params.id, function(results){

		res.render('customer-home/providerinfo', {user: results});		
	});

});

router.get('/request-appointment/:id', function(req, res){

	serviceModel.getById(req.params.id, function(results){
        //console.log(results[0].servicename);
        if(result="")
        {
            res.redirect('../customer-home/index');
        }
        else
		    res.render('appointment/index', {user: results});		
	});

});

router.post('/request-appointment/:id', function(req, res){
	
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


module.exports = router;


