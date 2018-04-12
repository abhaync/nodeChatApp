var socket = io();
socket.on('connect', function() {
  console.log('Connected to Server');

})
socket.on('disconnect', function() {
  console.log("Disconnected from server");
})
socket.on('newMessage', function(msg) {
  console.log("New Message: ", msg);
  var li = $('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);
  $('#messages').append(li);
})

socket.on('newLocationMessage', function(msg) {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My Current Location</a>');
  li.text(`${msg.from}: `);
  a.attr('href', msg.url);
  li.append(a);
  $('#messages').append(li)
})

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function() {

  })
})

var locBtn = $('#send-location');
locBtn.on('click', function() {
  if(!navigator.geolocation){
    return alert('geolocation not supported');
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    } )
  }, function() {
    alert('Unable to fetch location')
  })
})
