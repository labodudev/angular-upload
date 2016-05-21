"use strict"

/**
* Upload class
*
* @author Jimmy Latour <lelabodudev@gmail.com>
* @version 0.0.1
* @since 0.0.1
*/

var fs = require('fs');

var File = require('./file');

class Upload {
  constructor () {}

  apply (req, res) {
    this.buffer = [];
    this.tmpBuffer = "";
    this.res = res;

    req.setEncoding("binary");
    req.on('data', this.onData);
    req.on('end', this.end);
  }

  onData (buffer) {
    upload.tmpBuffer += buffer;
    if (upload.tmpBuffer.length >= 268369920) {
      upload.emptyTmpBuffer();
    }
  }

  end () {
    // @TODO : Name of file
    upload.emptyTmpBuffer();

    if (upload.buffer.length > 0) {
      let file = new File(upload.buffer);
      var fileName = file.getFileName();
      let buffer = file.getContent();
      for (let key in buffer) {
        fs.writeFileSync('./uploads/' + fileName, buffer[key], {encoding: 'binary', flag: 'a'});
      }
      upload.res.writeHead(200, {'Content-Type': 'application/json'});
      upload.res.end(JSON.stringify({ "fileName": fileName }));
    }
  }

  emptyTmpBuffer () {
    if (upload.tmpBuffer.length > 0) {
      upload.buffer.push(upload.tmpBuffer);
      upload.tmpBuffer = "";
    }
  }
}

var upload = new Upload();
module.exports = upload;
