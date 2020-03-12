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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

// mySQL POOL
pool.getConnection(function(err, connection) {
  if (err) throw err;
  console.log('Connected to database');


  // USER HANDLING
    // USER HANDLING
      // USER HANDLING
  app.post('/login', (req,res) => {
    const {username, password} = req.body;
    pool.query('SELECT * from users where username = "'+username+'"', (error, results) => {
      if(error) {
        throw error;
      } if(results.length > 0) {
        bcrypt.compare(password, results[0].password, (error, result) => {
          if(result === true) {
            token = jwt.sign({uid: results[0].id}, process.env.jwtSecret);
            res.send({uid: results[0].id, token: token});
          }
         });
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
        pool.query(`INSERT into users (username, password, email) VALUES ("${username}", "${hash}", "${email}")`, (error, results) => {
          if(error) {
            throw error;
          } else {
            res.sendStatus(200);
          }
        });
      }
    })
  });

  app.post('/checkToken', (req, res) => {
    jwt.verify(req.body.token, process.env.jwtSecret, (error, decoded) => {
      if(decoded !== undefined) {
        res.send(decoded);
      }
    })
  })

  // ITEMS
    // ITEMS
      // ITEMS

  app.post('/getCurrentItems', (req,res) => {
    pool.query(`SELECT * from items where ownerID = "${req.body.id}" and sold = "0" ORDER BY createdAt DESC`, (error, results) => {
      if(error) {
        console.log(error);
      }
      res.send(results);
    });
  });

  app.post('/getSoldItems', (req,res) => {
    pool.query(`SELECT * from items where ownerID = "${req.body.id}" and sold = "1" ORDER BY soldAt DESC`, (error, results) => {
      if(error) {
        console.log(error);
      }
      res.send(results);
    });
  });

  app.post('/getItem', (req,res) => {
    pool.query('SELECT * from items where id = "' + req.body.id + '";',
      (error, results) => {
        if (error) {
          console.log("Error while getting item id: " + req.body.id);
        }
        if (results.length > 0) {
          res.send({status: 'success', item: results[0]});
        }
      }
    );
  })

  app.post('/unSold', (req, res) => {
    pool.query( "UPDATE items SET sold=0 WHERE id='"+req.body.id+"';", function(error) {
        if(error) {
          console.log(error);
        }
        res.sendStatus(200);
      });
  });

  app.post('/deleteItem', (req,res) => {
    pool.query("DELETE from items where id='" + req.body.id + "';", function(error) {
      if(error) {
        console.log(error);
      }
      res.sendStatus(200);
    });
  });

  app.post('/addItem', (req,res) => {
    const {item} = req.body;
    switch (item.type) {
      case 1:
        pool.query(
          "INSERT into items (name,buyPrice,estimatedPrice,size,length,width,cond,ownerID,type,sold) values ('" +
            item.name + "','" +
            item.price + "','" +
            item.estimatedPrice + "','" +
            item.size + "','" +
            item.length + "','" +
            item.width + "','" +
            item.cond + "', '" +
            item.ownerID + "','" +
            item.type +
            "',0);",
          function(error) {
            if (error) {
              console.log(error);
            }
          }
        );
        break;
      case 2:
        pool.query(
          "INSERT into items (name,buyPrice,estimatedPrice,size,shoeInsert,cond,ownerID,type,sold) values ('" +
            item.name + "','" +
            item.price + "','" +
            item.estimatedPrice + "','" +
            item.size + "','" +
            item.insert + "','" +
            item.cond + "','" +
            item.ownerID + "','" +
            item.type +
            "',0);",
          function(error) {
            if (error) {
              console.log(error);
            }
          }
        );
        break;
      case 3:
        pool.query(
          "INSERT into items (name,buyPrice,estimatedPrice,size,cond,ownerID,type,sold) values ('" +
            item.name + "','" +
            item.price + "','" +
            item.estimatedPrice + "','" +
            item.size + "','" +
            item.cond + "', '" +
            item.ownerID + "','" +
            item.type +
            "',0);",
          function(error) {
            if (error) {
              console.log(error);
            }
          }
        );
        break;
    }
  }); //addItem

  app.post('/updateItem', (req,res) => {
    const {item} = req.body;
    pool.query(
      "UPDATE items set name='" + item.name +
      "',buyPrice='" + item.buyPrice +
      "',sellPrice='" + item.sellPrice +
      "',size='" + item.size +
      "',estimatedPrice='"+ item.estimatedPrice +
      "', soldOn ='" + item.soldOn +
      "',length='" + item.length +
      "',width='" + item.width +
      "',shoeInsert='" + item.insert +
      "',cond='" + item.cond +
      "', trackingNumber='" + item.trackingNumber +
      "', shipCompany='" + item.shipCompany +
      "' where id='" + item.id +
      "';", function(error) {
        if(error) {
          console.log(error);
        }
        res.sendStatus(200);
      }
    );
  });

  app.post('/sellItem', (req,res) => {
    const {item} = req.body;
    console.log(item.soldOn);
    pool.query(
      "UPDATE items set sold='1', sellPrice='" +item.price +
      "', soldFor='" + item.soldFor +
      "', soldOn ='" + item.soldOn +
      "', shipCompany ='" + item.shipCompany +
      "', trackingNumber='"+item.trackingNumber +
      "', soldAt=CURRENT_TIMESTAMP where id='" +
      item.id +
      "';",function(error) {
        if (error) {
          console.log(error);
        }
        res.sendStatus(200);
      }
    );
  })




}); //pool getConnection
