var express = require('express');
var userModel = require('./../models/customer-model');

var router = express.Router();

router.get('/', function (req, res) {
    res.render('customer-home/index.ejs');
});


router.get('/appointment', function (req, res) {
    res.render('appointment/index.ejs');
});

router.get('/profile', function(req, res){
    var abc= req.cookies['userid'];
    console.log(abc);
	userModel.getprofile(abc, function(results){

		res.render('customer-home/profile', {user: results});		
	});

});


module.exports = router;


