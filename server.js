const express = require('express');
const app     = require('express')();
const server  = require('http').Server(app);
const io      = require('socket.io')(server);

app.use('/', express.static(__dirname + '/'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

io.on('connection', (socket) => {
  socket.on('client coordinates', (msg) => {
    console.log(msg);
  });
});

server.listen(3000);