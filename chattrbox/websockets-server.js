var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;

var ws = new WebSocketServer({
  port: port
});
var messages = [];
var topic = "";

console.log("websockets server started");

ws.on("connection", function(socket) {
  console.log("client connection established");
  if (topic != "") {
    socket.send("*** Topic is '" + topic + "'");
  }
  messages.forEach(function(msg) {
    socket.send(msg);
  });



  socket.on("message", function(data) {
    console.log("message received: " + data);

    if (data.substr(0, 6) == "/topic") {
      topic = data.substr(6);
      var newData = "*** Topic has changed to" + data.substr(6);
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(newData)
      });
    } else {
      messages.push(data);
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(data)
      });
    }
  });
});
