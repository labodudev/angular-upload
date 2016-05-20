"use strict"

/**
* File class
*
* @author Jimmy Latour <lelabodudev@gmail.com>
* @version 0.0.1
* @since 0.0.1
*/

class File {
  constructor (buffer) {
    this.buffer = buffer;
    this.meta = [];
    this.getFileName();
    this.getContent();
  }

  getFileName () {
    this.meta = this.buffer[0].split('\r\n');

    if (this.meta[1].indexOf("filename=") != -1){
      this.fileName = this.meta[1].substring(this.meta[1].indexOf("filename=") + 10, this.meta[1].length - 1);

      if (this.fileName.indexOf('\\') != -1)
        this.fileName = this.fileName.substring(this.fileName.lastIndexOf('\\')+1);
    }
  }

  getContent () {
    this.meta.shift();
    this.meta.shift();
    this.meta.shift();
    this.meta.shift();

    if (this.buffer.length == 1) {
      this.meta.unshift();
      this.meta.unshift();
    }
    else {
      this.buffer[this.buffer.length - 1].unshift();
      this.buffer[this.buffer.length - 1].unshift();
    }

    return this.buffer;
  }

  checkExtension (callback) {
    var ext = ".txt";
    callback(null, ext);
  }
}

module.exports = File;
