var http = require("http");
var fs = require("fs");
var extract = require("./extract");
var wss = require("./websockets-server");

var handleError = function(err, res) {
  var filePath = extract("/error.html");
  console.log(filePath);
  res.writeHead(404);
  fs.readFile(filePath, function(req, data) {
    res.end(data);
  });
};

var server = http.createServer(function(req, res) {
  console.log("Responding to a request.");
  var filePath = extract(req.url);

  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      res.end(data);
    }
  });
});
server.listen(3000);
