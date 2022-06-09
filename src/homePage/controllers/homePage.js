const express = require('express');

const router = express.Router();
const KatalogService = require('../../katalog/services/katalog.service');

const katalogService = new KatalogService();

router.get('/', async (req, res) => {
  // ulozeni JSON objektu do categoriesTree
  const categoriesTree = await katalogService.ListKategorii();
  res.render('indexHomePage', { categoriesTree });

  // console.log(JSON.stringify(categoriesTree, undefined, 4))
});

module.exports = router;
