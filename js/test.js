$(function () {
  var socket = io();
  $('form').submit(function () {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  appendMessage = function (msg) {
    var item = $('<li class="list-group-item">').text(msg)
    $('#messages').append(item);
    item.fadeIn(500).delay(500).fadeOut(500);
  }
  $('#editor').keydown(function (e) {
    console.log(e);
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      socket.emit('send file', $(this).val());
      return
    }
  });
  var events = {
    'chat message': appendMessage,
    'server message': appendMessage,
    'open file': function (data) {
      console.log(data);
      $('#editor').val(data);
    }
  }
  Object.keys(events).map(function (eventName) {
    return socket.on(eventName, events[eventName])
  })
});
