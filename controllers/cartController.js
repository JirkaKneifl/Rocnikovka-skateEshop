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
    
    const dataPridejDoKosiku = {
            mnozstvi: req.body.mnozstvi,
            IDproduktu: req.body.IDproduktu
    }
    console.log(dataPridejDoKosiku)

    req.session.dataPridejDoKosiku = dataPridejDoKosiku;

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

router.get('/tvoje-udaje', async function(req, res){
    const categoriesTree = await ModelCategory.SelectAllCategories();//ulozeni JSON objektu do categoriesTree
    res.render('../views/cartPage/tvoje-udaje.ejs', { categoriesTree })
});

module.exports = router;