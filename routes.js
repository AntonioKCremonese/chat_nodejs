const {Router} = require('express');
const UserController = require('./controllers/UserController');
const ChatController = require('./controllers/ChatController');

const routes = new Router();

routes.get('/user',UserController.get);
routes.get('/user/:id',UserController.getById);
routes.post('/user/login',UserController.login);
routes.post('/user',UserController.post);
routes.put('/user',UserController.put);
routes.delete('/user/:id',UserController.delete);
routes.get('/',ChatController.aplication);
routes.get('/signup',ChatController.signup);
routes.get('/authenticate',ChatController.authenticate);


module.exports = routes;