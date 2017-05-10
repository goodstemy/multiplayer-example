const express = require('express');
const app     = require('express')();
const server  = require('http').Server(app);
const io      = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

let cache = null;

io.on('connection', (socket) => {
  socket.on('client coordinates', (msg) => {
    const parsedMsg = JSON.parse(msg);

    if (!!parsedMsg.element && !cache) {
      cache = msg;
      io.emit('server response', cache);
    } else if (!parsedMsg.element && !!cache) {
      msg = cache;
      io.emit('server response', msg);
    } else {
      io.emit('server response', msg);
    }
  });
});

server.listen(PORT);