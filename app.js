const express = require('express');
const app = express();
const randomToken = require('random-token');
const path = require("path");
const mysql = require("mysql")
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

  app.get('/getCurrentItems/:id', (req,res) => {
    pool.query(`SELECT * from items where ownerID = "${req.params.id}" and sold = "0"`, (error, results) => {
      if(error) {
        console.log(error);
      }
      res.send(results);
    });
  });

  app.get('/getSoldItems/:id', (req,res) => {
    pool.query(`SELECT * from items where ownerID = "${req.params.id}" and sold = "1"`, (error, results) => {
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
        res.send({id: results[0].id, token: results[0].token});
      } else {
        res.send({status: 'failed'});
      }
    });
  });

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
    const {token} = req.body;
    pool.query('SELECT * from users where token = "'+token+'"', (error, results) => {
      if(error) {
        throw error;
      } if(results.length > 0 ) {
        res.send({userID: results[0].id});
      }
    })
  })
}); //pool getConnection
