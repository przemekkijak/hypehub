const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mysql = require('mysql');
const bodyParser = require('body-parser');

const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer(app)

const io = socketIO(server)


io.on('connection', socket => {

    socket.on('getCurrentItems', (fn) => {
        connection.query('SELECT * from hh_items where sold = "0"', function(error, results) {
            if(error) throw error;
            fn(results);
        })
    })

    socket.on('getSoldItems', (fn) => {
        connection.query('SELECT * from hh_items where sold = "1"', function(error, results) {
            if(error) throw error;
            fn(results);
        })
    })

    // deleting items
    socket.on('deleteItem', (id) => {
        connection.query("DELETE from hh_items where id='"+id+"';",
        function(error) {
            if(error) throw error;
    })
})
    // adding items
    socket.on('addItem', (item) => {
        connection.query("INSERT into hh_items (name,buyPrice,size,cond,sold) values ('" + item.name + "','" + item.price + "','" +item.size + "','" + item.cond + "',0);", function(error) {
            if(error) throw error;
        })
    })

    socket.on('sellItem',(item) => {
        console.log('trying to sell item for ' + item.price + ' hmm ' + item.id)
        connection.query("UPDATE hh_items set sold='1', sellPrice='"+item.price+"' where id='"+item.id+"';", function(error) {
            if(error) throw error;
        })
    })
});

server.listen(4001, () => console.log(`SocketServer listening on port 4001`));

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

app.post('/sellItem', (req,res) => {
    // console.log('selling item id='+req.body.item+' for ' +  req.body.price);
    connection.query("UPDATE hh_items set sold='1', sellPrice='"+req.body.price+"' where id='"+req.body.item+"';");
});