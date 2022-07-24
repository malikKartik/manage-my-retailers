const app = require('./src/app');
const http = require('http');
const mongoose = require('mongoose');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);

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
  console.log("Listening on", bind)
}

const URI = "mongodb+srv://anakin:anakin@cluster0.u1akd.mongodb.net/anakin?retryWrites=true&w=majority"

mongoose.connect(URI, {}, (error) => {
  if (error) {
    console.error(`MongoDB connection error ${error}`);
  } else {
    console.log(`MongoDB connected successfully to : ProtonDB.`); // dev purpose
  }
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.error('Mongoose default connection disconnected');
});

exports.mongoURI = URI;