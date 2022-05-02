const express = require("express");
const router = express.Router();
const ModelCategory = require('../modules/ModelCategory');

router.get('/', async function(req, res){
    const categoriesTree = await ModelCategory.SelectAllCategories();//ulozeni JSON objektu do categoriesTree
    const dataPridejDoKosikuSession = req.session.dataPridejDoKosiku;
    
    
   /* if (req.session.dataPridejDoKosiku === undefined) {
         dataPridejDoKosikuSession = { mnozstvi: 0, IDproduktu: 0 };
    }else{
         dataPridejDoKosikuSession = req.session.dataPridejDoKosiku;
    }*/
    req.session.resetMaxAge
    console.log(req.session.cookie.maxAge)
    res.render('../views/cartPage/index.ejs', { categoriesTree, dataPridejDoKosikuSession  })
});

router.post('/', async function(req, res){
    const categoriesTree = await ModelCategory.SelectAllCategories();//ulozeni JSON objektu do categoriesTree
    
    if(!req.session.dataPridejDoKosiku || req.session.dataPridejDoKosiku.length === undefined){
        req.session.dataPridejDoKosiku = [];
    }

    const dataPridejDoKosikuNovouPolozku = 
        {
            mnozstvi: req.body.mnozstvi,
            IDproduktu: req.body.IDproduktu,
            obrazekProduktu: req.body.obrazekProduktu
        }
    

    

    req.session.dataPridejDoKosiku = [...req.session.dataPridejDoKosiku , dataPridejDoKosikuNovouPolozku] ; //vytvorim nove pole do ktereho zkopiruju stare a pridam na konec novou polozku

    const dataPridejDoKosikuSession = req.session.dataPridejDoKosiku;
    console.log(dataPridejDoKosikuSession)

    res.render('../views/cartPage/index.ejs', { categoriesTree, dataPridejDoKosikuSession , pocetNavstevProhlizece: req.session.pocetNavstevProhlizece })
    /*
    req.session.pocetNavstevProhlizece += 1;
    req.session.mnozstvi = req.body.mnozstvi
    console.log(req.session.cookie.maxAge)
    console.log(req.sessionID)
    */

    req.session.resetMaxAge
    console.log(req.session.cookie.maxAge)
});

/*
router.post('/objednavka-odeslana' async function(req, res){
    const categoriesTree = await ModelCategory.SelectAllC
     
    res.render('../views/cartPage/succesOrder.ejs', { categoriesTree}
});*/

module.exports = router;