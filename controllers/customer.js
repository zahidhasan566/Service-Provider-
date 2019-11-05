var express = require('express');
var userModel = require('./../models/customer-model');
var serviceModel = require('./../models/serviceprovider');
var appointmentModel = require('./../models/appointment-model');
var noticeModel = require('./../models/notice-model');
var feedbackModel = require('./../models/feedback-model');
var messageModel = require('./../models/message-model');


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
		if(results!="")
		{
			res.render('appointment/requested', {user: results});
		}
		else
		{
			res.send("No appointments");
		}	
			
			
        
    });
});

router.get('/completed', function(req, res){
	
    appointmentModel.getByIdCom(req.cookies['userid'],function(results){
		
		if(results!="")
		{
			res.render('appointment/completed', {user: results});
		}
		else
		{
			res.send("No appointments");
		}	
			
			
        
    });
});

router.get('/upcomming', function(req, res){
	
    appointmentModel.getByIdUp(req.cookies['userid'],function(results){
		
		if(results!="")
		{
			res.render('appointment/upcomming', {user: results});
		}
		else
		{
			res.send("No appointments");
		}	
			
			
			
        
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

router.post('/update', function(req, res){
	
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

router.get('/notice', function(req, res){

	noticeModel.getById(req.cookies['userid'],function(results){

		res.render('customer-home/notice', {user: results});		
	});

});

router.get('/give/feedback/:id', function(req, res){

	
        //console.log(results[0].servicename);
		res.render('feedback/givefeedback');
        	


});

router.post('/give/feedback/:id', function(req, res){
	//var cid=req.cookies['userid'];
	
	//console.log(req.params.id);
	serviceModel.getByServiceId(req.params.id,function(result){
		
		
		res.cookie('serviceid',result[0].userid);
			//console.log(result[0].userid);
		
			
	});

	var feedback = {
		cid :req.cookies['userid'],
		serviceid: req.cookies['serviceid'],
		message :req.body.message
		
		
	};
	
	console.log(req.cookies['serviceid']);
	

	feedbackModel.insert(feedback, function(status){
		console.log(status);
		if(status){
			res.redirect('/customer');
		}else{
			res.send("feedback insert error");
		}
	});
});

router.get('/feedback', function(req, res){

	feedbackModel.getById(req.cookies['userid'],function(results){

		res.render('feedback/feedback', {user: results});		
	});

});

router.get('/service-feedback/:id', function(req, res){

	
	feedbackModel.getById(req.params.id,function(results){

		res.render('feedback/feedback', {user: results});		
	});
	
		


});

router.get('/sms', function(req, res){

	
	messageModel.getById(req.cookies['userid'],function(results){
		console.log(req.cookies['userid']);
		if(results!="")
		{
			res.render('customer-home/sms', {message: results});
		}
		else
		{
			res.send("No messages");
		}		
	});
	
		


});

router.post('/sms', function(req, res){
	//var cid=req.cookies['userid'];
	var message = {
		sender :req.cookies['userid'],
		receiver: req.body.sender,
		message :req.body.message
		
		
	};
	console.log("sender: "+message.sender);
	//console.log("receiver: "+message.receiver);
	console.log("message: "+req.body.sender);
	console.log("message: "+message.message);
	

	messageModel.update(message, function(status){
		console.log(status);
		if(status){
			res.redirect('/customer');
		}else{
			res.send("message update error");
		}
	});
});





module.exports = router;


