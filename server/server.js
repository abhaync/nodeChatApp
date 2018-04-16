const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'..','public');

app.use(express.static(publicPath));
io.on('connection', (socket) => {
  console.log("New User Connected");

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
    }
  })

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and Room Required');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUsersList', users.getUserList(params.room))
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} Added`))
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
