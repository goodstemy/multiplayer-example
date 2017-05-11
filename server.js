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
  io.emit('cache response', cache);

  socket.on('client coordinates', (msg) => {
    socket.broadcast.emit('server response', msg);
  });

  socket.on('all coordinates', (msg) => {
    cache = JSON.parse(msg);
  });
});


server.listen(PORT);