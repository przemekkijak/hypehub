const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mysql = require('mysql');
const bodyParser = require('body-parser');

const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

// const index = require('./client/src/app/routes/index');
// app.use(index);

const server = http.createServer(app);
const io = socketIo(server);
const portS = process.env.PORT || 4001;

const currentItems = [];
const soldItems = [];
const pendingItems = [];

// const getApiAndEmit = async socket => {
//     try {
        
    
//     } catch (error) {
//         console.log(`Error: ${error.code}`);
//     }
// }

io.on("connection", socket => {
  console.log("New client connected");



  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("getCurrentItems", () => {
    console.log('items get');
      connection.query('SELECT * from hh_items where sold=0')
      .on('result', items => {
          currentItems.push(items);
      })
    });
});

server.listen(portS, () => console.log(`Listening socketIO on port ${portS}`));



// bodyParser to deconstruct variables after POST
app.use(bodyParser.json());
app.use(express.json({
    type: ['application/json', 'text/plain']
  }));
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hypehub'
})
connection.connect();
app.listen(port, () => console.log(`Hypehub running on port ${port}`));

//Get Current items from SQL
const getCurrent = app.get('/getCurrentItems', (req,res) => {
    connection.query('SELECT * from hh_items where sold = "0"', function(error, results, fields) {
if(error) throw error;
res.send(results)
    });
});

// Get SOLD items from SQL
const getSold = app.get('/getSoldItems', (req,res) => {
    connection.query('SELECT * from hh_items where sold= "1"', function(error, results, fields) {
        if(error) throw error;
        res.send(results);
    });
});

// Adding item to SQL
app.post('/addItem', (req,res) => {
    connection.query("INSERT into hh_items (name,buyPrice,size,cond,sold) values ('" + req.body.name + "','" + req.body.price + "','" + req.body.size + "','" + req.body.cond + "',0);", function(error) {
        if(error) throw error;
    })
});
// Deleting Item
app.post('/deleteItem', (req,res) => {
    connection.query("DELETE from hh_items where id='"+req.body.item+"';");
});

app.post('/sellItem', (req,res) => {
    // console.log('selling item id='+req.body.item+' for ' +  req.body.price);
    connection.query("UPDATE hh_items set sold='1', sellPrice='"+req.body.price+"' where id='"+req.body.item+"';");
});