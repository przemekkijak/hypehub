const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');

const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer(app)

const io = socketIO(server)

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hypehub'
})
connection.connect((error) => {
    if(error) {
    console.log(error);
    console.log('Error - Connecting to database failed');
    } else {
    console.log('Connected to database successfully');
    }

});

server.listen(4001, () => console.log(`Socketserver listening on port 4001`));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(express.json({
    type: ['application/json', 'text/plain']
  }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(port, () => console.log(`Hypehub running on port ${port}`));




io.on('connection', socket => {

    socket.on('auth', (user) => {
        connection.query('SELECT * from users WHERE username = "'+user.username+'" and password = "'+user.password+'"', function(error, results)  {
            if(error) throw error;
            if(results.length > 0) {
                console.log('User found')
                console.log(results)
                socket.emit('success');
            } else {
                socket.emit('failed','failed to login')
                console.log('user not found');
            }
        })
    })


    socket.on('getCurrentItems', (fn) => {
        connection.query('SELECT * from hh_items where sold = "0" order by createdAt', function(error, results) {
            if(error) {
                console.log(error)
                console.log('Error while geting current items from database');
            } else {
            fn(results);
        }})
    })

    socket.on('getSoldItems', (fn) => {
        connection.query('SELECT * from hh_items where sold = "1" order by soldAt', function(error, results) {
            if(error) {
                console.log(error)
                console.log('Error while geting sold items from database');
            }
            fn(results);
        })
    })

    socket.on('deleteItem', (id) => {
        connection.query("DELETE from hh_items where id='"+id+"';",
        function(error) {
            if(error) {
                console.log(error)
                console.log('Error while deleting item ID: ' + id);
            }
    })
})
    socket.on('addItem', (item) => {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let fullDate = (year+'-'+month+'-'+date);

        connection.query("INSERT into hh_items (name,buyPrice,size,cond,sold,createdAt) values ('" + item.name + "','" + item.price + "','" +item.size + "','" + item.cond + "',0,'"+fullDate+"');", function(error) {
            if(error) {
                console.log(error)
                console.log('Error while adding item to database');
            }
        })
    })

    socket.on('sellItem',(item) => {

        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let fullDate = (year+'-'+month+'-'+date);

        connection.query("UPDATE hh_items set sold='1', sellPrice='"+item.price+"', soldAt='"+fullDate+"' where id='"+item.id+"';", function(error) {
            if(error) {
                console.log(error)
                console.log('Error while selling item');
            }
        })
    })
});
