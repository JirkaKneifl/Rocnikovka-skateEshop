var mysql = require('mysql');

//vytvoreni spojeni s DB
var spojeni = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

//pouziti spojeni k overeni zda jsem pripojeni
spojeni.connect(function(err) {
  if (err) throw err;
  console.log("Pripojeno!");
});

module.exports = spojeni;