const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'..','public');

app.use(express.static(publicPath));
io.on('connection', (socket) => {
  console.log("New User Connected");
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'));
  socket.broadcast.emit('newMessage',generateMessage('Admin', 'New User Added'))
  socket.on('disconnect', () => {
    console.log("User Disconnected");
  })

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      callback('Name and Room Required')
    }
    callback();
  })

  socket.on('createMessage', (msgData, callback) => {
    console.log("New Message: ", msgData);
    io.emit('newMessage', generateMessage(msgData.from, msgData.text));
    callback();
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin',coords.lat,coords.lng))
  })

})
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
