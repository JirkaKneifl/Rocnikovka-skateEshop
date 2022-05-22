const spojeni = require("./databaseConection");

function query(sql, parametry) {
  return new Promise(function (resolve, reject) {
    try {
      spojeni.query(sql, parametry, function (err, results) {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    } catch (err) {
      reject(err);
    }
  });
}

async function SelectCenaJednohoProduktu(ID_produktu) {
  const PorduktyInfo = await query(`SELECT * FROM produkty WHERE ID_produktu = ?`, [ID_produktu]);
  return PorduktyInfo[0].cena;
}

async function SelectVsechnyProdukty(ID_kategorie){
   return query(`SELECT * FROM produkty WHERE ID_kategorie IN (SELECT ID_kategorie FROM kategorie WHERE ID_kat_nadrazene = ?);`, [ID_kategorie]);
}

async function SelectProduktyZPodkategorie(ID_kategorie){
  return query(`SELECT * FROM produkty WHERE ID_kategorie = ?`, [ID_kategorie]);
}

async function SelectDataJednohoProduktu(ID_produktu){
  return query(`SELECT * FROM produkty WHERE ID_kategorie = ?`, [ID_produktu]);
}

module.exports = {
  SelectVsechnyProdukty,
  SelectCenaJednohoProduktu,
  SelectDataJednohoProduktu,
  SelectProduktyZPodkategorie,
};
