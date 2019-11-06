var express = require('express');
var db = require('./../models/db.js');

var router = express.Router();

router.get('/', function(req, res){
    var sql= "select * from message ";
    db.getResults(sql, function(results){
       // if(req.cookies['senderid'] != null) {
            var seid = results[0].senderid;
            console.log(seid);
            res.render('login/index');
        //}
       /* else{
            res.send('invalid message sql');
        }*/
})});

router.post('/', function(req, res){

    var sql = "select * from user where username='"+req.body.uname+"' and password='"+req.body.password+"'";

    db.getResults(sql, function(results){
        if(results.length > 0){
            //req.session.un = req.body.uname;
            res.cookie('username', req.body.uname);
            res.redirect('/home');
        }else{
            res.send('invalid username/password');
        }
    });

});

module.exports = router;


