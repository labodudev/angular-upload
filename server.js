var http = require('http');
var fs = require('fs');

server = http.createServer( function(req, res) {

  if (req.url == '/') {
    fs.readFile('upload.html', function(err, page) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(page);
      res.end();
    });
  }

  if (req.url == '/uploadForm.html') {
    fs.readFile('uploadForm.html', function(err, page) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(page);
      res.end();
    });
  }

  if (req.url == '/angular.min.js' ) {
    fs.readFile('angular.min.js', function(err, page) {
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      res.write(page);
      res.end();
    });
  }

  if (req.url == '/angular-upload.js' ) {
    fs.readFile('angular-upload.js', function(err, page) {
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      res.write(page);
      res.end();
    });
  }
  if (req.url == '/xml-http-request.js' ) {
    fs.readFile('xml-http-request.js', function(err, page) {
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      res.write(page);
      res.end();
    });
  }

  if (req.url == '/angular-upload.css' ) {
    fs.readFile('angular-upload.css', function(err, page) {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(page);
      res.end();
    });
  }
});

server.on('error', function(req, res) {
  console.log('error');
});

server.on('request', function(req, res) {
  req.setEncoding('binary');
  var size = 0;
  var body = '';
  var gotData = function(d) {
      size += d.length; // add this chunk's size to the total number of bytes received thus far
      if (size > 20971520) {
          req.removeListener('data', gotData); // we need to remove the event listeners so that we don't end up here more than once
          req.removeListener('end', reqEnd);
          res.writeHead(413, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({"size": "Upload too large"}));
      }
      body += d;
  };

  var reqEnd = function() {
    if (body.length > 0) {
      var note = body.split('\r\n');
      var files = [];
      var filesSplitted = body.split(note[0]);

      filesSplitted.shift();
      for (var key in filesSplitted) {
         var fileExploded = filesSplitted[key].split('\r\n');
         var filename = "undefined";
         if (fileExploded[1].indexOf("filename=") != -1){
            fileName = fileExploded[1].substring(fileExploded[1].indexOf("filename=") + 10, fileExploded[1].length - 1);

            if (fileName.indexOf('\\') != -1)
              fileName = fileName.substring(fileName.lastIndexOf('\\')+1);
          }

         if (fileExploded[4]) {

            fs.writeFile('./' + fileName, fileExploded[4], 'binary', function(err)
            {
                //forward to another location after writing data
              res.writeHead(200, {'Content-Type': 'application/json'});
              res.end(JSON.stringify({ "fileName": fileName }));
            });
         }
      }
    }
  };

  req.on('data', gotData);
  req.on('end', reqEnd);

});

server.listen(80);
