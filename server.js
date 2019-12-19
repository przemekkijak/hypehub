const app = require('express')()
const port = process.env.PORT || 8080
const mysql = require('mysql')
const bodyParser = require('body-parser')

const session = require('express-session')({
    secret: 'hype',
    resave: true,
    saveUninitialized: true,
    maxAge: 6000000
})
const sharedsession = require('express-socket.io-session')

const server = require('http').createServer(app)
const io = require('socket.io')(server)


// SQL connect
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
// listenings
server.listen(4001, () => console.log(`Socketserver listening on port 4001`));
app.listen(port, () => console.log(`Hypehub running on port ${port}`));


app.use(bodyParser.json());


// handle sesssion
app.use(session);
io.use(sharedsession(session));


// socketIO
io.on('connection', socket => {

        if(socket.handshake.session.user) {
            socket.emit('loggedIn', true, socket.handshake.session.user.id);
        }

    socket.on('disconnect', function() {

    })

    socket.on('login', (user) => {
        connection.query('SELECT * from users WHERE username = "'+user.username+'" and password = "'+user.password+'"', function(error, results)  {
            if(error) throw error;
            if(results.length > 0) {
                socket.handshake.session.user = user;
                socket.handshake.session.user.id = results[0].id;
                socket.handshake.session.save();
                console.log('Logged as ' + socket.handshake.session.user.username + ' ID: ' + socket.handshake.session.user.id);
                socket.emit('success', socket.handshake.session.user.username, socket.handshake.session.user.id);

            } else {
                socket.emit('failed','failed to login')
                console.log('failed to login');
                socket.handshake.session.save();
            }
        })
    })


    socket.on('getCurrentItems', (fn) => {
        //  ownerID = "'+socket.handshake.session.user.id+'" and
        if(socket.handshake.session.user) {
        connection.query('SELECT * from hh_items where ownerID = "'+socket.handshake.session.user.id+'" and sold = "0" order by createdAt', function(error, results) {
            if(error) {
                console.log(error)
                console.log('Error while geting current items from database');
            }
            fn(results);
            })
        }
    })

    socket.on('getSoldItems', (fn) => {
        if(socket.handshake.session.user) {
        connection.query('SELECT * from hh_items where ownerID = "'+socket.handshake.session.user.id+'" and sold = "1" order by soldAt', function(error, results) {
            if(error) {
                console.log(error)
                console.log('Error while geting sold items from database');
            }
            fn(results);
            })
        }
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

        connection.query("INSERT into hh_items (name,buyPrice,size,cond,ownerID,sold,createdAt) values ('" + item.name + "','" + item.price + "','" +item.size + "','" + item.cond + "', '"+item.ownerID + "',0,'"+fullDate+"');", function(error) {
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
