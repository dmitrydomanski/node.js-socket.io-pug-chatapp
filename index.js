const express = require('express');
const socket = require('socket.io');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const server = app.listen(4000, () => console.log('server is up and listening on the port 4000'));

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

// configure the way we load views (path + engine)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//connect to the database
mongoose.connect('mongodb://localhost/socketchat', { useNewUrlParser: true });
let db = mongoose.connection;

//check db connection
db.once('open', () => console.log('connected to MongoDB'));

//check for db errors
db.on('error', (err) => console.log(err));

//bring in Model
let Message = require('./models/message');
let User = require('./models/user');

//app.use(express.static('public'));

const io = socket(server);
io.on('connection', (socket) => {

    console.log('socket conection established', socket.id)

    app.get('/', (req, res) => {
        res.render('index');
    });

    // catch chat message
    socket.on('input', (data) => {
        io.sockets.emit('input', data);
    });

    //catch typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
});
