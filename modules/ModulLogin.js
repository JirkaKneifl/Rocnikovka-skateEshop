const spojeni = require("./databaseConection");

function DataZDB(email) {
  spojeni.query(
    `SELECT * FROM zakaznici WHERE email = '${email}'`,
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email se selektnul uspesne z DB");
      }
    }
  );
}

module.exports.DataZDB = DataZDB;
