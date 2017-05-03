var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator = require('express-validator');
var expressSession= require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var session = require('cookie-session');
var helmet = require('helmet');
var routes = require('./routes/index');
var b2b = require('./routes/b2b');
var particulier = require('./routes/particulier');
var service_provider = require('./routes/service_provider');
var lalux = require('./routes/lalux');
var bids_process = require('./routes/bids_process');
var user_dashboard = require('./routes/user_dashboard');

//var users = require('./routes/users');

var app = express();


app.set('trust proxy', 1);

/*var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
 app.use(session({
 name: 'UzengoSession',
 keys: ['key1', 'key2'],
 cookie: {
 secure: true,
 httpOnly: true,
 domain: 'uzengo.com',
 path: '/bar',
 expires: expiryDate
 }
 }));
 */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));



app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret:'211Ezefzef&', saveUninitialized:false,resave:false}));
app.use('/b2b', b2b);
app.use('/particulier', particulier);
app.use('/service_provider', service_provider);
app.use('/bids_process', bids_process);
app.use('/user_dashboard', user_dashboard);
app.use('/lalux', lalux);





app.use('/', routes);

//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
