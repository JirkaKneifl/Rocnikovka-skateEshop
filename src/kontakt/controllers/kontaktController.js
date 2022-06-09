const express = require('express');
const KatalogService = require('../../katalog/services/katalog.service');
const katalogService = new KatalogService();
const router = express.Router();

router.get('/', async (req, res) => {
  const categoriesTree = await katalogService.ListKategorii();// ulozeni JSON objektu do categoriesTree
  res.render('indexKontakt', { categoriesTree });
});

module.exports = router;
