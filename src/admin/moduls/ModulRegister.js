const spojeni = require("../../../databaseConection");

function query(sql) {
    return new Promise(function(resolve, reject){
        try {
            spojeni.query(sql, function(err, results){
                if(err){
                    return reject(err);
                }
                return resolve(results);
            })
        } catch (err) {
            reject(err);
        }
    })
}

async function InsertDoZamestnanci(jmeno, prijmeni, telefon, email, heslo) {
  return query(`INSERT INTO objednavky_produkty ('${ID_produktu}', '${ID_objednavky}' , '${aktualniCenaProduktu}' , '${mnozstviVObjednavce}')`);
}

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
