var express = require('express');
var db = require('./../models/db.js');
var servicemodel = require('./../models/serviceprovider.js');
var router = express.Router();

router.get('*', function (req, res, next) {

    if (req.cookies['username'] != null) {
        next();
    } else {
        res.redirect('/login');
    }
});
















router.get('/', function(req, res){
    servicemodel.getById(26, function(status){

        console.log(status[0].spid);
        console.log(status[0].servicename);
        console.log(status[0].price);
    });
        
    });

router.get('/appointment', function(req, res){

    var sql = "select * from user";
    db.getResults(sql, function(results) {
        if (req.cookies['username'] != null) {
            var abc = req.cookies['userid'];


            var sql1 = "select * from appointment where spid="+abc+" and request=0";
            db.getResults(sql1, function (results) {
                if (results.length > 0) {
                    res.render('appointment/index', {appointment: results[0]});
                } else {
                    res.redirect('/homesp');
                }


            });


        }
    })

});

router.post('/register/servicereg', function(req, res){

   var accept=req.body.accept;
    var reject=req.body.reject;


if(accept)
{

    var sql1 = "select * from user";
    db.getResults(sql1, function(results){
        if(req.cookies['username'] != null) {
            var abc = req.cookies['userid'];
            console.log(abc);







    var sql= "update appointment set request=1 where spid='"+abc+"'";
    db.execute(sql, function (status) {
        //console.log(status);
        if (status) {

            //res.send('message successful');
            res.redirect('/homesp');
        } else {
            res.send(' failed to execute');
            // res.redirect('/sms');
        }
    });
        }
    });


        }



   else if(reject)
    {
        var sql= "delete from appointment where cid='"+req.body.cid+"'";
        db.execute(sql, function (status) {
            //console.log(status);
            if (status) {

                //res.send('message successful');
                res.redirect('/homesp');
            } else {
                res.send(' failed to execute');
                // res.redirect('/sms');
            }
        });
    }





});

module.exports = router;


