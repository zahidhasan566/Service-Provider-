//DECLARATION
var express  	= require('express');
var ejs  		= require('ejs');
var bodyParse  	= require('body-parser');
var exSession  	= require('express-session');
var cookieParser= require('cookie-parser');
var home  	    = require('./controllers/home');
var homesp  	= require('./controllers/homesp');
var department  = require('./controllers/department');
var user  		= require('./controllers/user');
var login  		= require('./controllers/login');
var serviceprovider = require('./controllers/serviceprovider');
var logout  	= require('./controllers/logout');
var register  	= require('./controllers/register');
var sms 		= require('./controllers/sms');
var skill		= require('./controllers/skill');
var profile		= require('./controllers/profile');
var feedback	= require('./controllers/feedback');
var notice	= require('./controllers/notice');
var logout  	= require('./controllers/logout');
const path = require('path');
var app 		= express();

//CONGIFURATION
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(bodyParse.urlencoded({extended:false}));
app.use(exSession({secret:"my top secret value", saveUninitialized:true, resave:false}));
app.use(cookieParser());
app.use('/home', home);
app.use('/homesp', homesp);
app.use('/user', user);
app.use('/register', register);
app.use('/serviceprovider', serviceprovider);
app.use('/login', login);
app.use('/department', department);
app.use('/sms', sms);
app.use('/skill',skill);
app.use('/profile',profile);
app.use('/feedback',feedback);
app.use('/notice',notice);
app.use('/logout', logout);
app.use(express.static(path.join(__dirname, 'public')));

//ROUTING
app.get('/', function(req, res){
	res.send('<h2>hello from express</h2>');
});


//SERVER STARTUP
app.listen(3000, function(){
	console.log('server started at 3000...');
});
