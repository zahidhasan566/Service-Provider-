var express = require('express');
var ejs = require('ejs');
var bodyParse = require('body-parser');
var exSession = require('express-session');
var cookieParser = require('cookie-parser');
var adminhome = require('./controllers/adminhome');
var admin = require('./controllers/admin');
var login = require('./controllers/login');
var logout = require('./controllers/logout');
var register = require('./controllers/register');
var home = require('./controllers/home');
var customer = require('./controllers/customer');
const path = require('path');
var app = express();

//CONGIFURATION
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(bodyParse.urlencoded({ extended: false }));
app.use(exSession({ secret: "my top secret value", saveUninitialized: true, resave: false }));
app.use(cookieParser());
app.use('/home', home);
app.use('/login', login);
app.use('/customer', customer);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/adminhome', adminhome);
app.use('/admin', admin);
app.use('/register', register);
app.use('/logout', logout);






//ROUTING
app.get('/', function (req, res) {
	res.send('<h2>hello from express</h2>');
});


//SERVER STARTUP
app.listen(3000, function () {
	console.log('server started at 3000...');
});
