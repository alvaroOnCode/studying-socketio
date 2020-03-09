const dotenv = require('dotenv');
const express = require('express')();
const http = require('http').Server(express);
const path = require('path');
const socketio = require('socket.io')(http);

dotenv.config({
  path: path.join(__dirname, './env/.env')
})

const gameData = require('./store/data');

let position = gameData.position;

socketio.on('connection', socket => {
  socket.emit('position', position);

  socket.on('move', data => {
    switch (data) {
      case "left":
        position.x -= 5;
        socketio.emit('position', position); // Mind that event is sent by socketio
        break;
      case "right":
        position.x += 5;
        socketio.emit('position', position); // Mind that event is sent by socketio
        break;
      case "up":
        position.y -= 5;
        socketio.emit('position', position); // Mind that event is sent by socketio
        break;
      case "down":
        position.y += 5;
        socketio.emit('position', position); // Mind that event is sent by socketio
        break;
    }
  });
});

http.listen(process.env.SERVER_PORT, () => {
  console.log(`Server on port ${process.env.SERVER_PORT}`);
});
