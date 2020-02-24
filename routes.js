const {Router} = require('express');
const UserController = require('./controllers/UserController');

const routes = new Router();

routes.get('/user',UserController.get);
routes.get('/user/:id',UserController.getById);
routes.post('/user/login',UserController.login);
routes.post('/user',UserController.post);
routes.put('/user',UserController.put);
routes.delete('/user/:id',UserController.delete);

module.exports = routes;