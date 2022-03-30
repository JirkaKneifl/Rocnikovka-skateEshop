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

//
async function SelectDataNadKategorieProduktu() {
  return query(
    `SELECT * FROM produkty WHERE ID_kategorie IN (SELECT ID_kategorie FROM kategorie WHERE ID_kat_nadrazene = '${ID_hlavniKategorie}';`);
}

async function SelectDataPodKategorieProduktu() {
  return query(
    `SELECT * FROM produkty WHERE ID_kategorie IN (SELECT ID_kategorie FROM kategorie WHERE ID_kat_nadrazene = '${ID_podkategorie}';`);
}

module.exports = {
  SelectDataNadKategorieProduktu,
  SelectDataPodKategorieProduktu,
};
