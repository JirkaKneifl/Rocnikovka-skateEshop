const express = require('express');

const router = express.Router();
const KatalogService = require('../../katalog/services/katalog.service');

const katalogService = new KatalogService();

router.get('/', async (req, res) => {
  // ulozeni objektu listu kategorií do categoriesTree
  const categoriesTree = await katalogService.ListKategorii();
  res.render('indexHomePage', { categoriesTree });
});

module.exports = router;
