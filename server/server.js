const express = require('express');
const app     = express();
const server  = require('http').Server(app);
const io      = require('socket.io')(server);
const port    = process.env.PORT || 3000;

//all connected to the server users
var users = {};

io.on('connection', (socket) => {
    console.log(`user has connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`user has disconnected: ${socket.id}`);
    });
});

// Runs once the server is online
server.listen(port, () => {
    console.log('server is running @', port);
});
