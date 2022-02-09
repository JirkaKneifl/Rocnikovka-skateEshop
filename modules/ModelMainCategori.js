const spojeni = require("./databaseConection");
//test
function SelectMainCategori() {
  let sql = `SELECT * FROM kategorie WHERE ID_kat_nadrazene = 0`;
  spojeni.query(sql, function (err) {
    if (err) {
      throw err;
    }else{
        ;
    }
  });
}

module.exports = SelectMainCategori;
