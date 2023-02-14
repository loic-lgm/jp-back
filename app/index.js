require("dotenv").config();
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const cors  = require('cors');

const pool = require("./config");


app.use(cors('*'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


const router = require('./router')

// app.use(router); 

app.get('/', (req, res) => {

  const category = pool.query('SELECT * FROM category', (err, result) => {
    console.log(err, result.rows)
    res.json(result.rows)
  })

  // console.log(category)
   

})

module.exports = app; 