require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors  = require('cors');
const router = require('./router')

app.use(cors('*'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(router); 

module.exports = app; 