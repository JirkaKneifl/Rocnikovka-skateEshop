//pripojeni k databazi
const mysql = require('mysql');

//vytvoreni propojeni
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'e-shop-db-prkna'
});

//funkce zda je pripojeno nebo neni
conn.connect(function (error){
    if(error) throw error;
        console.log('databaze je pripojena');

});

module.exports = conn;