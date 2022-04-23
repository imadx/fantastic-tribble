#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from '../app';
import debug from 'debug';
import http from 'http';

debug('ghost-task:server');

const port = getNormalizedPort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function getNormalizedPort(val: string): number | null {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return null;
  }

  return port;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(exception: OnErrorException) {
  if (exception.syscall !== 'listen') {
    throw exception;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (exception.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw exception;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
  debug('Listening on ' + bind);
}

interface OnErrorException extends Error {
  code?: string;
  syscall?: string;
}
