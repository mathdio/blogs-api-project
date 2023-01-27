const express = require('express');
const loginValidation = require('./middlewares/loginValidation');
const usersController = require('./controllers/users.controller');
const categoriesController = require('./controllers/categories.controller');
const blogPostsController = require('./controllers/blogPosts.controller');
const newUserValidation = require('./middlewares/newUserValidation');
const newCategoryValidation = require('./middlewares/newCategoryValidation');
const auth = require('./middlewares/auth');
const newPostValidation = require('./middlewares/newPostValidation');

// ...

const app = express();

app.use(express.json());

// ...
app.post('/login', loginValidation, usersController.validateLogin);

app.post('/user', newUserValidation, usersController.createUser);

app.get('/user', auth, usersController.findAll);

app.get('/user/:id', auth, usersController.findById);

app.post('/categories', auth, newCategoryValidation, categoriesController.createCategory);

app.get('/categories', auth, categoriesController.findAll);

app.post('/post', auth, newPostValidation, blogPostsController.createPost);

app.get('/post', auth, blogPostsController.findAll);

app.get('/post/:id', auth, blogPostsController.findById);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
