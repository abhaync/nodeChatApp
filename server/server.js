const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

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

  socket.on('createMessage', (msgData) => {
    console.log("New Message: ", msgData);
    io.emit('newMessage', generateMessage(msgData.from, msgData.text))
    // socket.broadcast.emit('newMessage', {
    //   from: msgData.from,
    //   text: msgData.text,
    //   createdAt: new Date().getTime()
    // })
  })

})
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
