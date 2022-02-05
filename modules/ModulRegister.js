const spojeni = require("./databaseConection");

function DataDoDB(jmeno, prijmeni, telefon, email, heslo) {
  spojeni.query(
    `INSERT INTO zakaznici(jmeno, prijmeni, telefon, email, heslo) VALUES ('${jmeno}','${prijmeni}', '${telefon}','${email}','${heslo}')`,
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Data se importovali dobře");
      }
    }
  );
}

module.exports.DataDoDB = DataDoDB;
