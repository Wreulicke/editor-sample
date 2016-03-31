var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')
var fs = require('fs')
require("./routing/router")(__dirname, app)
var watch = require('chokidar').watch(".", {
  ignored: /(\.git)|(bower_components)|(node_modules)|(\.gitignore)/,
  persistent: true
});

watch.on('change', function (path) {
  io.emit('server message', "change file: " + path);
})

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function () {
    io.emit('chat message', "disconnect member")
  });
  socket.on('send file', function (data) {
    fs.writeFile('test/test.html', data, function (err) {
      if (err) 
        throw err;
      console.log("savefile")
      io.emit('open file', data);
    })
  });
  fs.readFile('test/test.html', function (err, data) {
    if (err) 
      throw err;
    io.emit('open file', data.toString());
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});

require('child_process').exec('start http://localhost:3000 2>&1||xdg-open http://localhost:3000', function () {})
