const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hypehub'
})
connection.connect();

app.listen(port, () => console.log(`Hypehub running on port ${port}`));


app.get('/getCurrentItems', (req,res) => {
    connection.query('SELECT * from hh_items where sold = "0"', function(error, results, fields) {
if(error) throw error;
res.send(results)
    });
});

app.get('/getSoldItems', (req,res) => {
    connection.query('SELECT * from hh_items where sold= "1"', function(error, results, fields) {
        if(error) throw error;
        res.send(results);
    });
});