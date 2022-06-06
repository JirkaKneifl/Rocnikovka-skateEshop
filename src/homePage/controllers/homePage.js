const express = require("express");
const router = express.Router();
const ModelCategory = require('../../katalog/moduls/ModelCategory');
const ejs = require('ejs')
const KatalogService = require('../../katalog/services/katalog.service')
const katalogService = new KatalogService();

router.get('/', async function (req, res){
    const categoriesTree = await katalogService.ListKategorii();//ulozeni JSON objektu do categoriesTree 
    res.render('indexHomePage', {categoriesTree})
     

    //console.log(JSON.stringify(categoriesTree, undefined, 4))
})

module.exports = router;