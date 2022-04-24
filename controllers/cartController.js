const express = require("express");
const router = express.Router();
const ModelCategory = require('../modules/ModelCategory');

router.get('/', async function(req, res){
    const categoriesTree = await ModelCategory.SelectAllCategories();//ulozeni JSON objektu do categoriesTree
    
    req.session.pocetNavstevProhlizece += 1;
    console.log(req.session.cookie.maxAge)
    console.log(req.sessionID)

    res.render('../views/cartPage/index.ejs', { categoriesTree , pocetNavstevProhlizece: req.session.pocetNavstevProhlizece })
});

router.get('/tvoje-udaje', async function(req, res){
    const categoriesTree = await ModelCategory.SelectAllCategories();//ulozeni JSON objektu do categoriesTree
    res.render('../views/cartPage/tvoje-udaje.ejs', { categoriesTree })
});

module.exports = router;