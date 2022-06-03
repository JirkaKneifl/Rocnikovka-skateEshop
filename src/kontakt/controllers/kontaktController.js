const express = require("express");
const router = express.Router();
const ModelCategory = require('../../katalog/moduls/ModelCategory');

router.get('/', async function (req, res){
    const categoriesTree = await ModelCategory.SelectAllCategories();//ulozeni JSON objektu do categoriesTree 
    res.render('indexKontakt', {categoriesTree})
})

module.exports = router;