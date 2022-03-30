const spojeni = require("./databaseConection");

function query(sql) {
  return new Promise(function (resolve, reject) {
    try {
      spojeni.query(sql, function (err, results) {
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

async function SelectDataNadKategorieProduktu(ID_hlavniKategorie) {
  return query(`SELECT * FROM produkty WHERE ID_kategorie IN (SELECT ID_kategorie FROM kategorie WHERE ID_kat_nadrazene = '${ID_hlavniKategorie}');`); //'${ID_hlavniKategorie}'
}

async function SelectDataPodKategorieProduktu(ID_podkategorie) {
  return query(`SELECT * FROM produkty WHERE ID_kategorie IN (SELECT ID_kategorie FROM kategorie WHERE ID_kat_nadrazene = '${ID_podkategorie}');`);//'${ID_podkategorie}'
}

module.exports = {
  SelectDataNadKategorieProduktu,
  SelectDataPodKategorieProduktu,
};
