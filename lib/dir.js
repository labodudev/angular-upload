"use strict"

/**
* Dir read dir
* route.
*
* @author Jimmy Latour <lelabodudev@gmail.com>
* @version 0.0.1
* @since 0.0.1
*/

var fs = require('fs');
var path = require('path');

class Dir {
  constructor () {}

  readDirSync (folder, foundedPathFiles) {
    /** Read the folder */
    let ressources = fs.readdirSync(folder);
    for (let key in ressources) {
      let stat = fs.statSync(folder + "/" + ressources[key]);

      if (stat.isDirectory()) {
        this.readDirSync(folder + "/" + ressources[key], foundedPathFiles);
      }

      if (stat.isFile()) {
        let keyPath = "/" + ressources[key];
        // Set keyPath to / for index.html
        if (keyPath === "/index.html" ) {
          keyPath = "/";
        }

        foundedPathFiles[keyPath] = folder + "/" + ressources[key];
      }
    }

    return foundedPathFiles;
  }
}

module.exports = new Dir();
