var express = require('express');
var db = require('./../models/db.js');

var router = express.Router();
router.get('*', function (req, res, next) {

    if (req.cookies['username'] != null) {
        next();
    } else {
        res.redirect('/login');
    }
});

/*router.get('/', function(req, res){
    res.render('sms/index');
});*/

router.get('/', function(req, res){
    var sql1 = "select * from user";
    db.getResults(sql1, function(results){
        if(req.cookies['username'] != null){
            var abc=req.cookies['userid'];
            //console.log(abc);
           // console.log("abc");

            var sql = "select message,senderid from message where receiverid='"+abc+"'";
            db.getResults(sql, function(results){

                if(results.length > 0){
                    res.render('sms/index', {message: results[0]});
                }else{
                    res.redirect('/homesp');
                }
            });



           // res.render('sms/index', {user: results[0],abc});
        }
    });





});


router.post('/', function(req, res){

    var sql1 = "select * from user";
    db.getResults(sql1, function(results){
        if(req.cookies['username'] != null) {
            var abc = req.cookies['userid'];
            console.log(abc);




            var sql= "update message set senderid='"+abc+"',receiverid='"+req.body.senderid+"',message='"+req.body.msgreply+"' where receiverid='"+abc+"' ;"
            db.execute(sql, function (status) {
                //console.log(status);
                if (status) {

                    //res.send('message successful');
                    res.redirect('/homesp');
                } else {
                    res.send('message failed');
                    // res.redirect('/sms');
                }
            });



        }

});
});
module.exports = router;


