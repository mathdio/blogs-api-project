const express = require('express');
const loginValidation = require('./middlewares/loginValidation');
const usersController = require('./controllers/users.controller');
const newUserValidation = require('./middlewares/newUserValidation');

// ...

const app = express();

app.use(express.json());

// ...
app.post('/login', loginValidation, usersController.validateLogin);

app.post('/user', newUserValidation, usersController.createUser);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
