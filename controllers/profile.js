var express = require('express');
var userModel = require('./../models/profile');
var db = require('./../models/db.js');
var router = express.Router();


router.get('*', function (req, res, next) {

    if (req.cookies['username'] != null) {
        next();
    } else {
        res.redirect('/login');
    }
});



router.get('/profile', function(req, res){



        var sql1 = "select * from user";
        db.getResults(sql1, function (results) {
            if (req.cookies['username'] != null) {

                var abc = req.cookies['userid'];

                userModel.getprofile(abc,function(results){
                    // console.log("abc");
                    res.render('profile/profile', {user: results});



                })
        }
    })
});




router.get('/update/:id', function(req, res){

	/*userModel.getupdate(req.params.id, function(results){
		res.render('profile/updateprofile', {user: results});
	});

	 */
    var sql1 = "select * from user";
    db.getResults(sql1, function (results) {
        if (req.cookies['username'] != null) {

            var abc = req.cookies['userid'];

            userModel.getupdate(abc,function(results){
                // console.log("abc");
                res.render('profile/updateprofile', {user: results});



            })
        }
    })

});

router.post('/profile/update', function(req, res){


    var sql1 = "select * from user";
    db.getResults(sql1, function(results){
        if(req.cookies['username'] != null) {
            var abc = req.cookies['userid'];
            console.log(abc);




            var sql = "update user set username='" + req.body.username + "', email='" + req.body.email + "', phone='" + req.body.phone+ "', password='" +  req.body.password + "', gender='" +  req.body.gender + "', city='" + req.body.city+ "' where userid='"+abc+"' ;"
            db.execute(sql, function (status) {
                //console.log(status);
                if (status) {

                    //res.send('message successful');
                    res.redirect('/homesp');
                } else {
                    res.send('failed to execute ');
                    // res.redirect('/sms');
                }
            });



        }
        else{
            res.redirect('/login');

        }
    });












});
router.post('/profile/delete', function(req, res){


    var sql1 = "select * from user";
    db.getResults(sql1, function(results){
        if(req.cookies['username'] != null) {
            var abc = req.cookies['userid'];
            console.log(abc);




            var sql = " delete from user where userid='"+abc+"' ;"
            db.execute(sql, function (status) {
                //console.log(status);
                if (status) {

                    //res.send('message successful');
                    res.redirect('/login');
                } else {
                    res.send(' failed to execute ');
                    // res.redirect('/sms');
                }
            });



        }
        else{
            res.redirect('/login');

        }
    });












});

module.exports = router;
