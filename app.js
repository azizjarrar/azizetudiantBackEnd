const express = require('express')
const morgan = require('morgan')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
var client = require('./db_connection');
const path = require('path');
const user_route = require('./api/routes/user')
const universities_route = require('./api/routes/universities')
const comments_route = require('./api/routes/comments')
  client.connect(function(err) {
    if (err){
        console.log(err.message)
    }else{
      console.log("Connected!");
    };
  });
  /***************************************/
  /*************cors handler**************/
  /***************************************/
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin,X-Requested-With,Content-Type,Accept,Authorization'
    )
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET')
      return res.status(200).json({})
    }
    next()
  })
  app.use(express.urlencoded({extended: true}));  
  app.use(express.json())
  
  app.use(morgan('dev'))

  app.use('/user', user_route)
  app.use('/universities', universities_route)
  app.use('/comments', comments_route)




  app.use((req, res) => {
    res.status(404).json({ error: 'api not found' })
  })


module.exports = app
