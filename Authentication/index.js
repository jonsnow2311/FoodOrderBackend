const Joi = require('joi'); //for validation
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('config');
const dbConfig = require('./db.js');
const login = require('./routes/login');
const signup = require('./routes/signup');
const users = require('./routes/users');

mongoose.connect(dbConfig.url)
 .then( () => console.log('Connected to MongoDB...'))
 .catch( err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/login' , login);
app.use('/api/signup' , signup);
app.use('/api/users' , users);

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('Listening on port ${port}...'));