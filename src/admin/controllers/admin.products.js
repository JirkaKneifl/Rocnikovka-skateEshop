const express = require('express');
const router = express.Router();
const KatalogService = require('../../katalog/services/katalog.service');
const katalogService = new KatalogService();

const ProductService = require('../services/product.service');
const productService = new ProductService();

const AdminAddProductsSentDTO = require('../dto/admin-AddProducts-sent.dto');
const AdminUpdateProductsSentDTO = require('../dto/admin-UpdateProducts-sent.dto');

// vypis produktu v daminu
router.get('/produkty', async (req, res) => {
    const listProduktu = await productService.ListProduktu();
    const categoriesTree = await katalogService.ListKategorii();// ulozeni JSON objektu do categoriesTree
    const listVyrobcu = await productService.ListVyrobcu();
  
    res.render('indexAdminProducts', { listProduktu, categoriesTree, listVyrobcu });
});


// detail produktu
router.get('/produkty/:ID_produktu', async (req, res) => { 
    const categoriesTree = await katalogService.ListKategorii();// ulozeni JSON objektu do categoriesTree
    const detailProduktu = await productService.DetailProduktu(req.params.ID_produktu);
    const listVyrobcu = await productService.ListVyrobcu();

    res.render('AdminProductsDetail', { categoriesTree, detailProduktu, listVyrobcu });
});



// pridani produktu
router.post('/produkty/add/:ID_produktu', async (req, res) => {
    const dto = AdminAddProductsSentDTO.FromRequest(req);
    await productService.PridejProdukt(dto);

    res.redirect('/login/admin-sekce/produkty');
});


// update produktu
router.post('/produkty/update/:ID_produktu', async (req, res) => {
    const dto = AdminUpdateProductsSentDTO.FromRequest(req);
    await productService.UpdateProdukt(req.params.ID_produktu, dto);

    res.redirect('/login/admin-sekce/produkty');
});


// delete produktu
router.get('/produkty/delete/:ID_produktu', async (req, res) => {
    await productService.RemoveProdukt(req.params.ID_produktu);

    res.redirect('/login/admin-sekce/produkty');
});

module.exports = router;