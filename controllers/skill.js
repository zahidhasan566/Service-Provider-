var express = require('express');
var db = require('./../models/db.js');
var userModel = require('./../models/register');
var router = express.Router();

router.get('*', function (req, res, next) {

    if (req.cookies['username'] != null) {
        next();
    } else {
        res.redirect('/login');
    }
});



router.get('/', function(req, res){
    var sql1 = "select * from user";
    db.getResults(sql1, function(results){
        if(req.cookies['username'] != null){
            var abc=req.cookies['userid'];
            console.log(abc);


                if(results.length > 0){
                    res.render('skill/index', {user: results[0],abc});
                }else{
                    res.redirect('/homesp');
                }
            }



            // res.render('sms/index', {user: results[0],abc});
        else{
            res.redirect('/login');
        }
    });


});




router.post('/servicereg2', function(req, res){







    var user = {
          spid: req.body.spid,
         sname: req.body.sname,
        price: req.body.price,
         des: req.body.des

    }
    console.log(user.spid,user.sname,user.price,user.des);

    userModel.registerservice(user, function(status){

        if(status){

            res.redirect('/homesp');
        }else{
            res.send('fail to insert');
        }
    });

});








module.exports = router;
