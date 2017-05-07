var express = require('express'),
	csrf = require('csurf'),
	port = process.env.PORT || 5000,
	favicon = require('serve-favicon'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	expressHbs = require('express-handlebars'),
	mongoose = require('mongoose'),
	logger = require('morgan'),
	session = require('express-session'),
	flash = require('connect-flash'),
	passport = require('passport'),
	validator = require('express-validator');


var routes = require('./routes/index');	
var userRoutes = require('./routes/user');
var app = express();


// var users = require('./routes/users');

var config = require('./mongo/config');
mongoose.connect(config.database, function(){
	console.log("Connected to db!");
});
var seeder = require('./seed/ProductSeeder');
require('./config/passport');

var csrfProtection = csrf({ cookie: true });

//view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set(express.static(__dirname + '/views'));
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extened:false }));
//MUST BE DOWN AFTER PARSER FOR VALIDATION
app.use(validator())
app.use(cookieParser());
app.use(session({secret: 'repowaves', resave: false, saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

app.use('/user', userRoutes);
app.use('/', routes);


//catch 404 and foward to error handler
app.use(function(req, res, next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//development error handler
//will print stacktrace

if (app.get('env') === 'development') {
	app.use(function(err, req, res, next){
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
};

//production error handler
//no stacktraces leaked to user

// app.use(function(err, req, res, next){
// 	res.status(err.status || 500);
// 	res.render('err', {
// 		message: err.message,
// 		error: {}
// 	});
// });

app.listen(port, () => console.log('listening on port ' + port));

module.exports = app;
