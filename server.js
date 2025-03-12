const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app)


const io = require('socket.io')(server);


app.use(express.static(path.join(__dirname + '/public')));


io.on('connection', (socket) => {
    socket.on('newUser', (username) => {
        socket.broadcast.emit('update', username + " joined the conversaton");
    })
    socket.on('exituser', (username) => {
        socket.broadcast.emit('update', username + " left the conversaton");
    })
    socket.on('chat', (message) => {
        socket.broadcast.emit('chat', message);
    })
})


server.listen(5000, () => console.log('listening on port 5000'));