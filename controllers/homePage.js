const express = require("express");
const router = express.Router();
const ModelCategory = require('../modules/ModelCategory');

router.get('/', async function (req, res){
    const categoriesTree = await ModelCategory.SelectAllCategories();//ulozeni JSON objektu do categoriesTree 
    res.render('../views/homePage/index.ejs', {categoriesTree})

    //console.log(JSON.stringify(categoriesTree, undefined, 4))
})

module.exports = router;