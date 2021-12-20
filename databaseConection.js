var mysql = require('mysql');

//vytvoreni spojeni s DB
var spojeni = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "e-shop-db-prkna"
});

//pouziti spojeni k overeni zda jsem pripojeni
spojeni.connect(function(err) {
  if (err) throw err;
  console.log("Pripojeno!");
});

module.exports = spojeni;