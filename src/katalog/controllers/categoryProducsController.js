const express = require('express');

const router = express.Router();
const KatalogService = require('../services/katalog.service');

const katalogService = new KatalogService();

// funkce pro generovani jednotlivych produktu
router.get('/produkty/:ID_produktu?', async (req, res) => {
  const categoriesTree = await katalogService.ListKategorii();// ulozeni JSON objektu do categoriesTree
  const { ID_produktu } = req.params;

  const produkt = await katalogService.DetailProduktu(ID_produktu);
  console.log(produkt);
  res.render('indexProductsInfo', { categoriesTree, produkt, polozkyVKosiku: req.session.dataPridejDoKosiku });
});

// funkce rendrujici produkty do vypisu produktu dle dane URL id
router.get('/:ID_hlavniKategorie/:ID_podkategorie?', async (req, res) => { // -> /k/:hlavniKategorie/:podkategorie?
  const categoriesTree = await katalogService.ListKategorii();// ulozeni JSON objektu do categoriesTree
  const { ID_hlavniKategorie, ID_podkategorie } = req.params;

  if (ID_podkategorie === undefined) {
    const ID_kategorie = parseInt(ID_hlavniKategorie);

    const Produkty = await katalogService.ListVsechProduktu(ID_kategorie);
    res.render('indexProducts', { categoriesTree, Produkty, polozkyVKosiku: req.session.dataPridejDoKosiku });
    // console.log(Produkty);
  } else {
    const ID_kategorie = parseInt(ID_podkategorie);

    const Produkty = await katalogService.ListProdukuZPodkategorie(ID_kategorie);
    res.render('indexProducts', { categoriesTree, Produkty, polozkyVKosiku: req.session.dataPridejDoKosiku });
    // console.log(Produkty);
  }
});

module.exports = router;
