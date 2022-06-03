const express = require("express");
const router = express.Router();
const ModelCategory = require('../../katalog/moduls/ModelCategory');
const ejs = require('ejs')

router.get('/', async function (req, res){
    const categoriesTree = await ModelCategory.SelectAllCategories();//ulozeni JSON objektu do categoriesTree 
    res.render('indexHomePage', {categoriesTree})
     

    //console.log(JSON.stringify(categoriesTree, undefined, 4))
})

module.exports = router;