const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require('./repository/UserRepository');


app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'public'));
app.engine('ejs',require('ejs').renderFile);
app.set('view engine','ejs');
app.use(express.json());

app.get('/',(req,res) => {
    res.render('login',{message:'oi'});
});

app.get('/signup',(req,res) => {
    res.render('signup');
});

app.get('/authenticate',async (req,res,next) =>{
    const {mail,password} = req.query;
    const user = await UserRepository.getByMail(mail);

    if(!user){
        return res.status(400).send({error:'User not found'})
    }
    if(! await bcrypt.compareSync(password, user.password)){
        return res.status(400).send({error:'Password invalid'})   
    }
    const token = jwt.sign({id: user.id},'desafiochat',{
        expiresIn:86400
    })
    res.render('index',{author:user.name});
    
});

app.use(require('./routes'));

let messages = [];

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