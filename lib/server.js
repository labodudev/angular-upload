"use strict"

/**
* Server class listen the port 80
*
* @author Jimmy Latour <lelabodudev@gmail.com>
* @version 0.0.1
* @since 0.0.1
*/

var http = require('http');

var Router = require('./router');
Router.addStatic('./public');

var Upload = require('./upload');

class Server {
  constructor () {
    this.server = http.createServer(function (req, res) {
      Router.apply(req, res);
      Upload.apply(req, res);
    });
    this.server.listen(80);
  }
}

module.exports = new Server();
