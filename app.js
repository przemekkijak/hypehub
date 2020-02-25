const express = require("express");
const siofu = require('socketio-file-upload');
const app = express().use(siofu.router);
const server = require("http").createServer(app)
const io = require("socket.io")(server)
const fs = require('fs');
server.listen(5555, () =>
console.log(`Socketserver listening on port 5555`)
);

const path = require("path");
const mysql = require("mysql")

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
io.use(
  sharedsession(session, {
    autoSave: true
  })
);

app.use(express.static(path.join(__dirname, "/public/")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});


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

  // socketIO
  io.on("connection", socket => {
    console.log("connected " + socket.handshake.sessionID);
    socket.on("disconnect", function() {
      console.log("disconnected " + socket.handshake.sessionID);
    });

    socket.on("checkLog", function(token, id) {
      pool.query(
        'SELECT * FROM users where id = "' +id+'" and token = "' +token+'"',
        function(error, results) {
          if (error) {
            console.log("Error while geting user by token");
          }
          if (results.length > 0) {
            socket.handshake.session.user = {
              id: results[0].id,
              username: results[0].username,
              email: results[0].email,
              token: results[0].token
            };
            socket.handshake.session.userID = results[0].id;
            socket.handshake.session.save();
            socket.emit("success", socket.handshake.session.user);
          } else {
            socket.emit("failed");
          }
        }
      );
    });

    socket.on("login", user => {
      pool.query(
        'SELECT * from users WHERE username = "' +user.username +'" and password = "'+user.password +'"',
        function(error, results) {
          if (error) {
            console.log("Error while loging user");
          }
          if (results.length > 0) {
            socket.handshake.session.user = {
              id: results[0].id,
              username: results[0].username,
              email: results[0].email,
              token: results[0].token
            };
            socket.handshake.session.userID = results[0].id;
            socket.handshake.session.save();
            console.log(
              "Logged as " +
                socket.handshake.session.user.username +
                " ID: " +
                socket.handshake.session.user.id
            );
            socket.emit("success", socket.handshake.session.user);
          } else {
            socket.emit("failed", "failed to login");
            console.log("failed to login");
          }
        }
      );
    });

    socket.on("getUser", (id, fn) => {
      pool.query(
        'SELECT * from users where id = "' + id + '";',
        (error, results) => {
          if (error) {
            console.log("Error while geting user id: " + id);
          }
          fn(results);
        }
      );
    });

    socket.on("getItem", (id, fn) => {
      pool.query(
        'SELECT * from items where id = "' + id + '";',
        (error, results) => {
          if (error) {
            console.log("Error while getting item id: " + id);
          }
          if (results.length > 0) {
            fn(results);
          }
        }
      );
    });

    socket.on("getCurrentItems", fn => {
      pool.query(
        'SELECT * from items where ownerID = "' +
          socket.handshake.session.userID +
          '" and sold = "0" order by createdAt DESC',
        function(error, results) {
          if (error) {
            console.log(error);
            console.log("Error while geting current items from database");
          }
          fn(results);
        }
      );
    });

    socket.on("getSoldItems", fn => {
      if (socket.handshake.session.user) {
        pool.query(
          'SELECT * from items where ownerID = "' +
            socket.handshake.session.user.id +
            '" and sold = "1" order by soldAt DESC',
          function(error, results) {
            if (error) {
              console.log(error);
              console.log("Error while geting sold items from database");
            }
            fn(results);
          }
        );
      }
    }); //getSoldItems

    socket.on("deleteItem", id => {
      pool.query("DELETE from items where id='" + id + "';", function(error) {
        if (error) {
          console.log(error);
          console.log("Error while deleting item ID: " + id);
        }
      }); //poolQuery
    }); //deleteItem

    socket.on("addItem", item => {
      switch (item.type) {
        case 1:
          pool.query(
            "INSERT into items (name,buyPrice,estimatedPrice,size,length,width,cond,ownerID,type,sold) values ('" +
              item.name + "','" + item.price + "','" + item.estimatedPrice + "','" + item.size + "','" + item.length + "','" + item.width + "','" + item.cond + "', '" + item.ownerID +"','" + item.type + "',0);",
            function(error) {
              if (error) {
                console.log(error);
                console.log(
                  "Error while adding clothes to database, by User " +
                    item.ownerID
                );
              }
            }
          );
          break;
        case 2:
          pool.query(
            "INSERT into items (name,buyPrice,estimatedPrice,size,shoeInsert,cond,ownerID,type,sold) values ('" +
              item.name + "','" + item.price + "','" + item.estimatedPrice + "','" + item.size + "','" + item.insert + "','" + item.cond + "','" + item.ownerID +"','" + item.type + "',0);",
            function(error) {
              if (error) {
                console.log(error);
                console.log(
                  "Error while adding shoes to database, by User " +
                    item.ownerID
                );
              }
            }
          );
          break;
        case 3:
          pool.query(
            "INSERT into items (name,buyPrice,estimatedPrice,size,cond,ownerID,type,sold) values ('" +
              item.name + "','" +item.price + "','" +item.estimatedPrice +"','" +item.size +"','" +item.cond +"', '" +item.ownerID +"','" +item.type +"',0);",
            function(error) {
              if (error) {
                console.log(error);
                console.log(
                  "Error while adding accessories to database, by User " +
                    item.ownerID
                );
              }
            }
          );
          break;
      }
    });

    socket.on("sellItem", item => {
      pool.query(
        "UPDATE items set sold='1', sellPrice='" +
          item.price + "', soldFor='" + item.soldFor +
          "', shipCompany ='" + item.shipCompany + "', trackingNumber='"+item.trackingNumber+
          "', soldAt=CURRENT_TIMESTAMP where id='" +
          item.id +
          "';",
        function(error) {
          if (error) {
            console.log(error);
            console.log("Error while selling item");
          }
        }
      );
    });

    socket.on("updateItem", item => {
      pool.query(
        "UPDATE items set name='"+
        item.name+
        "',buyPrice='"+
        item.buyPrice+
        "',sellPrice='"+
        item.sellPrice+
        "',size='"+
        item.size+
        "',estimatedPrice='"+
        item.estimatedPrice+
        "',length='"+
        item.length+
        "',width='"
        +item.width+
        "',shoeInsert='"
        +item.insert+
        "',cond='"+
        item.cond+
        "' where id='"+
        item.id+"';",
        function(error) {
          if(error) {
            console.log(error);
            console.log("Error while updating item");
          }
        }
      )
    })
    socket.on("unSold", item => {
      pool.query(
        "UPDATE items SET soldFor='', shipCompany='', trackingNumber='', sold=0 WHERE id='"+item.id+"';", function(error) {
          if(error) {
            console.log(error);
            console.log("Error while unSold item");
          }
        }
      )
    })

    // PHOTOS
    let itemsPath = path.join(__dirname, `/client/public/img/items/`);

    var uploader = new siofu();
    uploader.dir = itemsPath;
    uploader.listen(socket);

    // events
    uploader.on('error', (event) => {
      console.log(event.error);
    })

    uploader.on('start', (event) => {
      console.log('Started uploading: ' + event.file.name);
      console.log(`ID: ${event.file.meta.id}, Order: ${event.file.meta.order}`);
    })

    uploader.on('saved', (event) => {
      if(event.file.success) {
        fs.rename((path.join(itemsPath, event.file.name)), (path.join(itemsPath, `${event.file.meta.id}_${event.file.meta.order}.jpg`)), (error) => {
          if(error) {
            console.log(error);
          } else {
            socket.emit('uploadSuccess');
          }
        }) //rename
      } //success
    }) //on('saved');

    // Check if photos for specific item already exist
    // ItemID - ID passing from itemDetail.js as props
    // Order - specific photo number from 1 to 4
    socket.on("checkPhoto", (itemID,order,fn) => {
      // Try to access file without opening it
        fs.access(path.join(itemsPath, `${itemID}_${order}.jpg`),fs.F_OK, (error) => {
          if(error) {
            fn(false); //File not found -> set nophoto.jpg for element
          } else {
          fn(true); // File found -> set photo for element
          }
        })
      });

  }); //socket connection on
}); //pool getConnection
