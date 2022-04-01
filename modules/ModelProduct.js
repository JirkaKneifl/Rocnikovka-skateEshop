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

async function SelectVsechnyProdukty(ID_hlavniKategorie, ID_podkategorie){
    const produkty = await query(`SELECT * FROM produkty;`)
    
    return produkty.filter(Produkt => Produkt.ID_produktu === ID_hlavniKategorie).map(Produkt => ({
        ...Produkt, 
        PodProdukt: produkty.filter(PodProdukt => PodProdukt.ID_produktu === ID_podkategorie)
    }))

    /*
    const categories = await query(`SELECT * FROM kategorie;`)
    
    return categories.filter(category => category.ID_kat_nadrazene === null).map(category => ({
        ...category, 
        podkategorie: categories.filter(podCategory => podCategory.ID_kat_nadrazene === category.ID_kategorie)
    }))
    */
}

module.exports = {
  SelectDataNadKategorieProduktu,
  SelectDataPodKategorieProduktu,
  SelectVsechnyProdukty,
};
