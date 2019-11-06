var express = require('express');
var db = require('./../models/db.js');
var feedbackModel = require('./../models/feedback-model');


var router = express.Router();
router.get('*', function (req, res, next) {

	if (req.cookies['username'] != null) {
		next();
	} else {
		res.redirect('/login');
	}
});












router.get('/feedback', function(req, res){

	var sql1 = "select * from user";
	db.getResults(sql1, function(results) {
		if (req.cookies['username'] != null) {
			var abc = req.cookies['userid'];
			//console.log(abc);
			// console.log("abc");

			var sql = "select * from feedback where serviceid='"+abc+"'";
			db.getResults(sql, function(results){

				if(results.length > 0){
					res.render('feedback/feedback', {feedback: results});
				}else{
					res.redirect('/homesp');
				}
			});


		}
	});

});

router.get('/service-feedback/:id', function(req, res){

	
	feedbackModel.getById(req.params.id,function(results){

		res.render('feedback/feedback', {user: results});		
	});
	
		


});


module.exports = router;


