const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mysql = require('mysql');
const bodyParser = require('body-parser');

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
app.get('/getCurrentItems', (req,res) => {
    connection.query('SELECT * from hh_items where sold = "0"', function(error, results, fields) {
if(error) throw error;
res.send(results)
    });
});

// Get SOLD items from SQL
app.get('/getSoldItems', (req,res) => {
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

app.post('/deleteItem', (req,res) => {
    connection.query("delete from hh_items where id='"+req.body.item+"';");
});