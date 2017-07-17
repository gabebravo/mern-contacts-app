const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://admin:password@ds161742.mlab.com:61742/contacts_db',  {
  useMongoClient: true, // weird new flag mongoose requires
});

app.use(bodyParser.json());

// routes specific to driver CRUD
const contactRouter = require('./routes/contact');
  app.use('/contact', contactRouter);

module.exports = app;
