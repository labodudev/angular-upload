"use strict"

/**
* Server Router manage all routes of the application
* With this class, you can add static routes, or dynamic
* route.
*
* @author Jimmy Latour <lelabodudev@gmail.com>
* @version 0.0.1
* @since 0.0.1
*/

var fs = require('fs');
var url = require('url');
var path = require('path');

var dir = require('./dir');

class Router {
  constructor (req, res) {
    this.req = req;
    this.res = res;
    this.files = [];
  }

  addStatic (folder) {
    if (!folder) {
      return;
    }

    this.files = dir.readDirSync(folder, []);
  }

  apply (req, res) {
    let page = url.parse(req.url).pathname;

    for (let keyPath in this.files) {
      if (page === keyPath) {
        this.end(this.files[keyPath], res);
      }
    }
  }

  end (file, res) {
    fs.readFile(file, 'utf-8', function(err, data) {
      if(err) {
        return console.log(err);
      }

      var ext = path.extname(file);
      ext = ext.replace('.', '');
      res.writeHeader(200, {"Content-Type": "text/" + ext});
      res.write(data);
      res.end();
    });
  }
}

module.exports = new Router();
