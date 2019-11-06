var express = require('express');
var router = express.Router();

router.get('*', function (req, res, next) {

	if (req.cookies['username'] != null) {
		next();
	} else {
		res.redirect('/login');
	}
});


router.get('/', function(req, res){

	//req.session.un = null;
	//res.clearCookie('username');
	//res.clearCookie('userid');
	res.clearCookie('username', { path: '/login' });
	res.clearCookie('userid', { path: '/login' });
	res.redirect('/login');
});

module.exports = router;


