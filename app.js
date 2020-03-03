const express = require('express');
const app = express();
const randomToken = require('random-token');
const path = require("path");
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const bcrypt = require('bcrypt');
const saltRounds = 10;


const server = app.listen(5555, () => {
  console.log(`Listening on port ${server.address().port}`);
})

pool = mysql.createPool({
  connectionLimit : 15,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "/public/")));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});



// mySQL POOL
pool.getConnection(function(err, connection) {
  if (err) throw err;
  console.log('Connected to database');

  app.post('/getCurrentItems', (req,res) => {
    pool.query(`SELECT * from items where ownerID = "${req.body.id}" and sold = "0"`, (error, results) => {
      if(error) {
        console.log(error);
      }
      res.send(results);
    });
  });

  app.post('/getSoldItems', (req,res) => {
    pool.query(`SELECT * from items where ownerID = "${req.body.id}" and sold = "1"`, (error, results) => {
      if(error) {
        console.log(error);
      }
      res.send(results);
    });
  });

  app.post('/login', (req,res) => {
    const {username, password} = req.body;
    pool.query('SELECT * from users where username = "'+username+'" and password = "'+password+'"', (error, results) => {
      if(error) {
        throw error;
      } if(results.length > 0) {
        token = jwt.sign({uid: results[0].id}, process.env.jwtSecret);
        res.send({uid: results[0].id, token: token});
      } else {
        res.send({status: 'failed'});
      }
    }); //query
  }); //post

  app.post('/register', (req,res) => {
    const {username, password, email} = req.body;
    let token = `${username}+${randomToken(20)}`;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if(err) {
        throw err;
      } else {
        pool.query(`INSERT into users (username, password, email, token) VALUES ("${username}", "${hash}", "${email}", "${token}")`, (error, results) => {
          if(error) {
            res.send({status: 'failed'});
            throw error;
          } else {
            res.send({status: 'success', token: token});
          }
        });
      }
    }) //hash
  }); //post

  app.post('/checkToken', (req, res) => {
    jwt.verify(req.body.token, process.env.jwtSecret, (error, decoded) => {
      if(decoded !== undefined) {
        res.send(decoded);
      }
    })
  }) //post


}); //pool getConnection
