const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'..','public');

app.use(express.static(publicPath));
io.on('connection', (socket) => {
  console.log("New User Connected");

  socket.on('disconnect', () => {
    console.log("User Disconnected");
  })

  socket.on('createMessage', (msgData) => {
    console.log("New Message: ", msgData);
    io.emit('newMessage', {
      from: msgData.from,
      text: msgData.text,
      createdAt: new Date().getTime()
    })
  })

})
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
