const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(4000, () => console.log('server is up and listening on the port 4000'));

app.use(express.static('public'));

const io = socket(server);
io.on('connection', (socket) => {

    console.log('socket conection established', socket.id)

    // catch chat message
    socket.on('input', (data) => {
        io.sockets.emit('input', data);
    });

    //catch typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
});
