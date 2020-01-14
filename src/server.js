const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

//mongoose.connect('mongodb+srv://omnistack:omnistack@filipeserver-8wfhq.mongodb.net/aircnc?retryWrites=true&w=majority', 
mongoose.connect('mongodb://localhost/aircnc',
    {useNewUrlParser:true,
    useUnifiedTopology: true});

const connectedUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});
   
app.use( (req, res, next) =>{
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors()); //Deixando vazio qualquer aplicação pode acessar a API. { origin : 'http://localhost:3333' }
app.use(express.json()); // Deve vir antes do use(routes). Só o que vem depois dessa linha entende instruções JSON
app.use('/files', express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

server.listen('3333');