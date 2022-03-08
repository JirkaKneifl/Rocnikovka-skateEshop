const express = require("express");
const router = express.Router();
const ModelCategory = require('../modules/ModelCategory');

router.get('/', async function (req, res){
    const categoriesTree = await ModelCategory.SelectAllCategories();
    
    console.log('1-----------------')
    console.log(await ModelCategory.SelectAllCategories({}));
    console.log('1-----------------')

    console.log('-----------------')
    console.log(categoriesTree)
    console.log('-----------------')
    console.log()
    res.render('../views/homePage/index.ejs', {categoriesTree})
})

module.exports = router;