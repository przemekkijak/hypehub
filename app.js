const express = require('express');
const app = express();
const axios = require('axios');
const path = require("path");
const mysql = require("mysql")

const server = app.listen(3001, () => {
  console.log(`Listening on port ${server.address().port}`);
})

  pool = mysql.createPool({
    connectionLimit : 15,
    host: 'mysql43.mydevil.net',
    user: 'm1231_admin',
    password: 'Hypehub1',
    database: 'm1231_hypehub'
  });

const session = require("express-session")({
  secret: "hype",
  resave: true,
  saveUninitialized: true,
    maxAge: 6000000
})
const sharedsession = require("express-socket.io-session")
const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(session);
app.use(express.static(path.join(__dirname, "/public/")));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

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


// mySQL POOL
pool.getConnection(function(err, connection) {
  if (err) throw err;
  console.log('Connected to database');

}); //pool getConnection
