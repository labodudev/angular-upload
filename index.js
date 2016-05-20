module.exports = require('./lib');

// var http = require('http');
// var fs = require('fs');
// var EventEmitter = require('events').EventEmitter;
// var uploadEvent = new EventEmitter();
//
// server = http.createServer( function(req, res) {
//
//   if (req.url == '/') {
//     fs.readFile('upload.html', function(err, page) {
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write(page);
//       res.end();
//     });
//   }
//
//   if (req.url == '/uploadForm.html') {
//     fs.readFile('uploadForm.html', function(err, page) {
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write(page);
//       res.end();
//     });
//   }
//
//   if (req.url == '/angular.min.js' ) {
//     fs.readFile('angular.min.js', function(err, page) {
//       res.writeHead(200, {'Content-Type': 'application/javascript'});
//       res.write(page);
//       res.end();
//     });
//   }
//
//   if (req.url == '/angular-upload.js' ) {
//     fs.readFile('angular-upload.js', function(err, page) {
//       res.writeHead(200, {'Content-Type': 'application/javascript'});
//       res.write(page);
//       res.end();
//     });
//   }
//   if (req.url == '/xml-http-request.js' ) {
//     fs.readFile('xml-http-request.js', function(err, page) {
//       res.writeHead(200, {'Content-Type': 'application/javascript'});
//       res.write(page);
//       res.end();
//     });
//   }
//
//   if (req.url == '/angular-upload.css' ) {
//     fs.readFile('angular-upload.css', function(err, page) {
//       res.writeHead(200, {'Content-Type': 'text/css'});
//       res.write(page);
//       res.end();
//     });
//   }
// });
//
// server.on('error', function(req, res) {
//   console.log('error');
// });
//
// server.on('request', function(req, res) {
//   req.setEncoding('binary');
//   var size = 0;
//   var body = new Array();
//   var tmp = '';
//   var gotData = function(d) {
//     tmp += d;
//     if (tmp.length >= 50) {
//       body.push(tmp);
//       tmp = "";
//     }
//     uploadEvent.emit('progress', d.length);
//   };
//
//   var reqEnd = function() {
//     if (body.length > 0) {
//       var content = new Array();
//       req.removeListener('data', gotData);
//       var note = body[0].split('\r\n');
//
//       var fileName = "undefined";
//       if (note[1].indexOf("filename=") != -1){
//         fileName = note[1].substring(note[1].indexOf("filename=") + 10, note[1].length - 1);
//
//         if (fileName.indexOf('\\') != -1)
//           fileName = fileName.substring(fileName.lastIndexOf('\\')+1);
//       }
//
//       var lastContentDeletedBoundary = body[body.length -1].split(note[0]);
//       note.shift();
//       note.shift();
//       note.shift();
//       note.shift();
//       content.push(note[0]);
//       for(var i = 1; i < body.length - 1; i++) {
//         content.push(body[i]);
//       }
//       content.push(lastContentDeletedBoundary[0].trim());
//       writeFile(fileName, content, 0, function() {
//         res.writeHead(200, {'Content-Type': 'application/json'});
//         res.end(JSON.stringify({ "fileName": fileName }));
//       });
//     }
//   };
//
//   req.on('data', gotData);
//   req.on('end', reqEnd);
//
// });
//
// function writeFile(fileName, array, key, callback) {
//   fs.writeFile('./uploads/' + fileName, array[key], {encoding: "binary", flag: "a"}, function(err)
//   {
//     if (key < array.length - 1) {
//       key++;
//       writeFile(fileName, array, key, callback);
//     }
//     else {
//       callback();
//     }
//   });
// }
//
// server.listen(80);
