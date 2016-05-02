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
  socket.on('send file', function (filepath, data) {
    fs.writeFile(path.join(".", filepath), data, function (err) {
      if (err) 
        throw err;
      console.log("savefile")
      io.emit('open file', data);
    })
  });
  fs.readFile('test/test.html', function (err, data) {
    if (err) 
      return;
    io.emit('open file', data.toString());
  });
});

var port = (process.argv.length < 3)
  ? 3000
  : process.argv[2]
http.listen(port, function () {
  console.log('listening on *:' + port);
});
if (process.argv.length < 3) {
  var url = 'http://localhost:' + port
  require('child_process').exec('start ' + url + ' 2>&1||xdg-open ' + url, function () {})
}
