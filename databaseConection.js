var mysql = require('mysql');

var spojeni = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "e-shop-db-prkna"
});

spojeni.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = spojeni;