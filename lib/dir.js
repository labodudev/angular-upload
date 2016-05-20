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

  readDir (folder, callback) {
    var foundedFiles = [];
    /** Read the folder */
    fs.readdir(folder, (err, files) => {
      if (err) {
        console.log(err);
        return;
      }

      var numberFile = files.length;

      /** Check if is file or directory */
      for (let file in files) {
        file = path.resolve(folder, files[file]);
        fs.stat(file, (err, stat) => {
          if (err) {
            console.log(err);
            return;
          }

          /** Is directory ? So read it */
          if (stat && stat.isDirectory()) {
            this.readDir(file, (foundedFile) => {
              foundedFiles = foundedFiles.concat(foundedFile);
              if (!--numberFile) callback(foundedFiles);
            });
          }
          else {
            foundedFiles.push(file);
            if (!--numberFile) callback(foundedFiles);
          }
        });
      }
    });
  }

  // searchFiles (folder, files, callback) {
  //   let foundedFile = [];
  //   let numberFiles = files.length;
  // }
}

module.exports = new Dir();
