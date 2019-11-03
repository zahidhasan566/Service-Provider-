var express = require('express');
var db = require('./../models/db.js');
var router = express.Router();

router.get('/', function(req, res){

		var sql = "select * from user";
		db.getResults(sql, function(results){
			
			res.render('adminhome/index');
		
		});
});

router.get('/test/:name/:id', function(req, res){

	res.send(req.params.id+ "|"+req.params.name)
})
 
 


module.exports = router;


