var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var debug = require('debug');
const routes = require('./routes/index');
var users = require('./routes/users');
var soundsRouter = require('./routes/sounds');
// var https = require('https');
// var fs = require('fs');
var cors = require('cors');
var indexRouter = require('./routes/index');

var mongoDB = require('./connection/dbConnection');

var mongo = new mongoDB();
var app = express();

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'DELETE,POST,GET,PUT');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

/* app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); */
//cross origin resource sharing setup
var corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://192.168.1.33:4200',
    'http://localhost:4200',
    'ionic://localhost',
    'http://localhost',
    'http://app/',
    'http://localhost:3006',
  ],
  methods: ['ACCEPT', 'GET', 'POST', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Origin', 'Accept', 'Content-Type', 'Authorization', 'X-Requested-With'],
  maxAge: 3600,
};
app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/sounds', express.static(path.join(__dirname, 'sounds')));

//Routes
app.use('/', routes);
app.use('/users', users);
app.use('/sounds', soundsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
/**
 * Get port from environment and store in Express.ddkdkfk80
 */

var port = normalizePort(process.env.PORT || '8000');
// var port = normalizePort(process.env.PORT || '4578');
app.set('port', port);

// var options = {
//   key: fs.readFileSync('/home/possibilities/htdocs/server/certs/privkey.pem'),
//   cert: fs.readFileSync('/home/possibilities/htdocs/server/certs/fullchain.pem')
// };

/**
 * Create HTTP server.
 */
if (process.env.mode === 'production') {
  server = https.createServer(httpOptions, app);
  server.listen(port, '127.0.0.1');
} else {
  server = http.createServer(app);
  server.listen(port, '192.168.1.33');
}
/**
 * Listen on provided port, on all network interfaces.
 */

// server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
// Calling connect method of MongoDb class in dbConnection.
mongo.connect();

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

//module.exports = app;
