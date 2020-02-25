const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server);

//Configura view engine EJS
app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'public'));
app.engine('ejs',require('ejs').renderFile);
app.set('view engine','ejs');
app.use(express.json());

//Rotas da aplicacao
app.use(require('./routes'));

let messages = [];

//Socket.io
io.on('connection', socket => {
    console.log(`User conectado: ${socket.id}`);

    socket.emit('previousMessage',messages);

    socket.on('chat message', function(message){
        messages.push(message);
        socket.broadcast.emit('receivedMessage', message);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

server.listen(3000,console.log("aplicacao rodando na porta 3000"));