var express = require('express');
var userModel = require('./../models/history');
var router = express.Router();

router.get('/feedback', function(req, res){

    userModel.getfeed(function(results){
        //start here
            res.render('history/feedback', {user: results});
        
    });
});





module.exports = router;
