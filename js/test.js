$(function () {
  var socket = io();
  // TODO 削除
  $('form').submit(function () {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  appendMessage = function (msg) {
    var item = $('<li class="list-group-item">').text(msg)
    $('#messages').append(item);
    item.fadeIn(500).delay(500).fadeOut(500, function () {
      $(this).remove();
    });
  }
  $('#editor').keydown(function (e) {
    target = $(this)
    if (e.keyCode === 9) {
      e.preventDefault();
      start = this.selectionStart;
      end = this.selectionEnd;
      value = target.val();
      target.val(`${value.substring(0, start)}\t${value.substring(end)}`);
      this.selectionStart = this.selectionEnd = start + 1;
      return false;
    }
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
      $('#editor').val(data);
    }
  }
  Object.keys(events).forEach(function (eventName) {
    socket.on(eventName, events[eventName])
  })
});
