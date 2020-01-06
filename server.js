const app = require('express')(),
port = process.env.PORT || 8080,
mysql = require('mysql'),
bodyParser = require('body-parser'),

session = require('express-session')({
    secret: 'hype',
    resave: true,
    saveUninitialized: true,
    maxAge: 6000000
}),
sharedsession = require('express-socket.io-session'),

server = require('http').createServer(app),
io = require('socket.io')(server),


// SQL connect
connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hypehub'
});
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
io.use(sharedsession(session, {
    autoSave: true
}));


// socketIO
io.on('connection', socket => {

    console.log('connected ' + socket.handshake.sessionID);
    socket.on('disconnect', function() {
        console.log('disconnected');
    })


    socket.on('checkLog', function(token,id){
        connection.query('SELECT * from USERS where id = "'+id+'" and token = "'+token+'"', function(error, results) {
            if(error) {console.log('Error while geting user by token')}
            if(results.length>0) {
                socket.handshake.session.user = {
                    id : results[0].id,
                    username : results[0].username,
                    email :  results[0].email,
                    token : results[0].token,
                }
                socket.handshake.session.userID = results[0].id;
                socket.handshake.session.save();
                socket.emit('success', socket.handshake.session.user);
            } else {
                socket.emit('failed');
            }
        })
    });



    socket.on('login', (user) => {
        connection.query('SELECT * from users WHERE username = "'+user.username+'" and password = "'+user.password+'"', function(error, results)  {
            if(error) { console.log('Error while loging user')}
            if(results.length > 0) {
                socket.handshake.session.user = {
                    id : results[0].id,
                    username : results[0].username,
                    email :  results[0].email,
                    token : results[0].token,
                }
                socket.handshake.session.userID = results[0].id;
                socket.handshake.session.save();
                console.log('Logged as ' + socket.handshake.session.user.username + ' ID: ' + socket.handshake.session.user.id);
                socket.emit('success', socket.handshake.session.user);

            } else {
                socket.emit('failed','failed to login')
                console.log('failed to login');
            }
        })
    })

    socket.on('getUser', (id, fn) => {
        connection.query('SELECT * from users where id = "' + id + '";', (error, results) => {
            if(error) {console.log('Error while geting user id: ' + id)}
            fn(results);
        })
    })

    socket.on('getItem', (id, fn) => {
        connection.query('SELECT * from items where id = "' + id + '";', (error,results) => {
            if(error) {console.log('Error while getting item id: ' + id)}
            if(results.length > 0) {
            fn(results);
            }
        })
    })


    socket.on('getCurrentItems', (fn) => {
        connection.query('SELECT * from items where ownerID = "'+socket.handshake.session.userID+'" and sold = "0" order by createdAt DESC', function(error, results) {
            if(error) {
                console.log(error)
                console.log('Error while geting current items from database');
            }
            fn(results);
            })
    })

    socket.on('getSoldItems', (fn) => {
        if(socket.handshake.session.user) {
        connection.query('SELECT * from items where ownerID = "'+socket.handshake.session.user.id+'" and sold = "1" order by soldAt DESC', function(error, results) {
            if(error) {
                console.log(error)
                console.log('Error while geting sold items from database');
            }
            fn(results);
            })
        }
    })

    socket.on('deleteItem', (id) => {
        connection.query("DELETE from items where id='"+id+"';",
        function(error) {
            if(error) {
                console.log(error)
                console.log('Error while deleting item ID: ' + id);
            }
    })
})
    socket.on('addItem', (item) => {
        connection.query("INSERT into items (name,buyPrice,size,cond,ownerID,sold) values ('" + item.name + "','" + item.price + "','" +item.size + "','" + item.cond + "', '"+item.ownerID+"',0);", function(error) {
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

        connection.query("UPDATE items set sold='1', sellPrice='"+item.price+"', soldAt=CURRENT_TIMESTAMP where id='"+item.id+"';", function(error) {
            if(error) {
                console.log(error)
                console.log('Error while selling item');
            }
        })
    })
});
