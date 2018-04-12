var socket = io();
socket.on('connect', function() {
  console.log('Connected to Server');

})
socket.on('disconnect', function() {
  console.log("Disconnected from server");
})
socket.on('newMessage', function(msg) {
  var time = moment(msg.createdAt).format('h:mm a')
  console.log("New Message: ", msg);
  var li = $('<li></li>');
  li.text(`${msg.from} ${time}: ${msg.text}`);
  $('#messages').append(li);
})

socket.on('newLocationMessage', function(msg) {
  var time = moment(msg.createdAt).format('h:mm a')
  var li = $('<li></li>');
  var a = $('<a target="_blank">My Current Location</a>');
  li.text(`${msg.from} ${time}: `);
  a.attr('href', msg.url);
  li.append(a);
  $('#messages').append(li)
})
var messageTextbox = $('[name=message]');
$('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val('');
  })
})

var locBtn = $('#send-location');
locBtn.on('click', function() {
  if(!navigator.geolocation){
    return alert('geolocation not supported');
  }
  locBtn.attr('disabled','disabled').text('Sending location ...')
  navigator.geolocation.getCurrentPosition(function(position) {
    locBtn.removeAttr('disabled').text('Send Location')
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    } )
  }, function() {
    alert('Unable to fetch location');
    locBtn.removeAttr('disabled').text('Send Location')
  })
})
