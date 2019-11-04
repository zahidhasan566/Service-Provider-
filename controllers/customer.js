var express = require('express');
var userModel = require('./../models/customer-model');
var serviceModel = require('./../models/serviceprovider');
var appointmentModel = require('./../models/appointment-model');

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

router.get('/requested', function(req, res){
	
    appointmentModel.getByIdReq(req.cookies['userid'],function(results){
			
			res.render('appointment/requested', {user: results});
			
        
    });
});

router.get('/completed', function(req, res){
	
    appointmentModel.getByIdCom(req.cookies['userid'],function(results){
        
			res.render('appointment/requested', {user: results});
			
        
    });
});

router.get('/upcomming', function(req, res){
	
    appointmentModel.getByIdUp(req.cookies['userid'],function(results){
        
			res.render('appointment/upcomming', {user: results});
			
        
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
	//var cid=req.cookies['userid'];
	var appoint = {
		cid :req.cookies['userid'],
		serviceid: req.body.serviceid,
		price :req.body.price,
		location: req.body.city,
		time: req.body.time,
		id: req.params.id
	};

	

	appointmentModel.insert(appoint, function(status){
		console.log(status);
		if(status){
			res.redirect('/customer');
		}else{
			res.send("insert error");
		}
	});
});

router.get('/requested/delete', function(req, res){

	appointmentModel.delete(req.cookies['userid'], function(status){
		if(status)
		{
			res.redirect('/customer');
		}
		else
			res.send("delete error");
			
	});

});

router.get('/upcomming/pay', function(req, res){

	appointmentModel.updatepay(req.cookies['userid'], function(status){
		if(status)
		{
			res.redirect('/customer');
		}
		else
			res.send("Pay error");
			
	});

});

router.get('/profile', function(req, res){

	userModel.getprofile(req.cookies['userid'],function(results){

		res.render('customer-home/profile', {user: results});		
	});

});

router.get('/update', function(req, res){

	userModel.getupdate(req.cookies['userid'], function(results){
		res.render('customer-home/updateprofile', {user: results});		
	});

});

router.post('/update/', function(req, res){
	
	var user = {
		username: req.body.username,
		phone: req.body.phone,
		password: req.body.password,
		email: req.body.email,
		gender: req.body.gender,
		city: req.body.city,
		id: req.cookies['userid']
		
	};
	userModel.update(user, function(status){
		console.log(status);
		if(status){
			res.redirect('/customer/profile');
		}else{
			res.redirect('/customer');
		}
	});
});

router.get('/profile/delete', function(req, res){

	userModel.disable(req.cookies['userid'], function(status){
		if(status)
		{
			res.redirect('/login');
		}
		else
			res.send("delete error");
			
	});

});



module.exports = router;


