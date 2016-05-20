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

var dir = require('./dir');

class Router {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.files = [];
  }

  addStatic(folder) {
    if (!folder) {
      return;
    }

    dir.readDir(folder, (files) => {
      console.log(files);
      if (files.length > 0) {
        this.files.push(files);
      }
    });
  }

  apply(req, res) {
    let page = url.parse(req.url).pathname;
    for (let file in this.files) {
      console.log(this.files[file]);
    }
  }
}

module.exports = new Router();
