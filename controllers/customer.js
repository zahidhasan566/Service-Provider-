var express = require('express');
var userModel = require('./../models/user-model');

var router = express.Router();

router.get('/', function (req, res) {
    res.render('customer-home/index');
});

router.post('/', function (req, res) {



    var user = {
        username: req.body.username,
        password: req.body.password
    }
    console.log(user.username);
    userModel.validate(user, function (status) {

        if (status == 1) {
            res.cookie('username', req.body.uname);
            res.redirect('/home');
        } else if (status == 2) {
            res.cookie('username', req.body.uname);
            res.redirect('/home');
        }
        else {
            res.send('invalid username/password');
        }
    });

});




module.exports = router;


