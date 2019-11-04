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


router.get('/providerupdate/:id', function(req, res){

	userModel.getById(req.params.id, function(results){
		res.render('admin/providerupdate', {user: results});		
	});

});

router.post('/providerupdate/:id', function(req, res){
	
	var user = {
		
		skill: req.body.skill,
		id: req.params.id
	};
	userModel.proupdate(user, function(status){
		console.log(status);
		if(status){
			res.redirect('/adminhome');
		}else{
			res.redirect('/adminhome');
		}
	});
});
router.get('/warning/:id', function(req, res){

	userModel.getById(req.params.id, function(result){
		res.render('admin/warning', {user: result});
	});
});

router.post('/warning/:id', function(req, res){
	userModel.getprofile(function(results){
console.log(results[0].userid);
var user = {
		
	warning: req.body.warning,
	userid: results[0].userid,
	id: req.params.id
};
	userModel.warning(user, function(status){
		if(status){
			res.redirect('/adminhome');
		}else{
			res.redirect('/adminhome');
		}
	});
});
});

router.get('/message/:id', function(req, res){

	userModel.getById(req.params.id, function(result){
		res.render('admin/message', {user: result});
	});
});

router.post('/message/:id', function(req, res){
	userModel.getprofile(function(results){
console.log(results[0].userid);
var user = {
		
	message: req.body.message,
	userid: results[0].userid,
	id: req.params.id
};
	userModel.message(user, function(status){
		if(status){
			res.redirect('/adminhome');
		}else{
			res.redirect('/adminhome');
		}
	});
});
});

router.get('/disable/:id', function(req, res){

	userModel.disable(req.params.id, function(status){
		if(status){
			res.redirect('/adminhome');
		}else{
			res.redirect('/adminhome');
		}
	});
});




router.get('/customer', function(req, res){

	userModel.getcustomer(function(results){
		
			res.render('admin/customer', {user: results});
		
	});
});



router.get('/customerinfo/:id', function(req, res){

	userModel.getByIdcus(req.params.id, function(results){

		res.render('admin/customerinfo', {user: results});		
	});

});


router.get('/cuswarning/:id', function(req, res){

	userModel.getByIdcus(req.params.id, function(result){
		res.render('admin/warning', {user: result});
	});
});

router.post('/cuswarning/:id', function(req, res){
	userModel.getprofile(function(results){
console.log(results[0].userid);
var user = {
		
	warning: req.body.warning,
	userid: results[0].userid,
	id: req.params.id
};
	userModel.warning(user, function(status){
		if(status){
			res.redirect('/adminhome');
		}else{
			res.redirect('/adminhome');
		}
	});
});
});

router.get('/feedback', function(req, res){

    userModel.getfeed(function(results){
		
		
            res.render('history/feedback', {user:results});
        
    });
});

router.get('/message', function(req, res){

    userModel.getmessage(function(results){
		
		
            res.render('history/message', {user:results});
        
    });
});

router.get('/history', function(req, res){

    userModel.gethistory(function(results){
		
		
            res.render('history/history', {user:results});
        
    });
});

router.get('/transaction', function(req, res){

    userModel.gettrans(function(results){
		
		
            res.render('history/transaction', {user:results});
        
    });
});

router.post('/searchpro', function(req, res){
	console.log('rted at 3000...');
	var user={
		ename:req.body.search
	}
	console.log(user.ename);
	userModel.searchpro(user, function(results){

		res.render('search/providersearch', {user: results});
	});
});

router.post('/searchcus', function(req, res){
	console.log('rted at 3000...');
	var user={
		ename:req.body.search
	}
	console.log(user.ename);
	userModel.searchcus(user, function(results){

		res.render('search/customersearch', {user: results});
	});
});



module.exports = router;
