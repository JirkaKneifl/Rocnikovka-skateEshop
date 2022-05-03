const express = require("express");
const router = express.Router();
const ModelCategory = require('../modules/ModelCategory');
const ModelProduct = require('../modules/ModelProduct');
const ModelCart = require('../modules/ModelCart');

router.get('/', async function(req, res){
    const categoriesTree = await ModelCategory.SelectAllCategories();//ulozeni JSON objektu do categoriesTree
    
    const dataPridejDoKosikuSession = req.session.dataPridejDoKosiku;
    
    
    console.log(req.session.cookie.maxAge)
    res.render('../views/cartPage/index.ejs', { categoriesTree, dataPridejDoKosikuSession  })
    req.session.resetMaxAge
});




router.post('/', async function(req, res){
    if(!req.session.dataPridejDoKosiku || req.session.dataPridejDoKosiku.length === undefined ){
        req.session.dataPridejDoKosiku = [];
    }
    const categoriesTree = await ModelCategory.SelectAllCategories();//ulozeni JSON objektu do categoriesTree
    const ID_produktu = req.body.IDproduktu;
    const PorduktyInfo = await ModelProduct.SelectDataJednohoProduktu(ID_produktu);
    
    const dataPridejDoKosikuNovouPolozku = 
        {
            nazev: req.body.nazev,
            mnozstvi: req.body.mnozstvi,
            IDproduktu: req.body.IDproduktu,
            obrazekProduktu: req.body.obrazekProduktu,
            PorduktyInfo: PorduktyInfo
        }
    
    req.session.dataPridejDoKosiku = [...req.session.dataPridejDoKosiku , dataPridejDoKosikuNovouPolozku] ; //vytvorim nove pole do ktereho zkopiruju stare a pridam na konec novou polozku

    const dataPridejDoKosikuSession = req.session.dataPridejDoKosiku;

    res.render('../views/cartPage/index.ejs', { categoriesTree, dataPridejDoKosikuSession , PorduktyInfo , pocetNavstevProhlizece: req.session.pocetNavstevProhlizece })
    req.session.resetMaxAge
});

/*
router.post('/objednavka-odeslana' async function(req, res){
    const categoriesTree = await ModelCategory.SelectAllC
     
    res.render('../views/cartPage/succesOrder.ejs', { categoriesTree}
});*/

module.exports = router;