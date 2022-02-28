const express = require("express");
const router = express.Router();
const ModelCategory = require('../modules/ModelCategory');

router.get('/', async function (req, res){
    const categories = await ModelCategory.SelectMainCategory();
    const categoriesSecond = await ModelCategory.SelectSecondCategory();


    console.log(categories)
    console.log('-----------------')
    console.log(categoriesSecond)
    res.render('../views/homePage/index.ejs', {categories, categoriesSecond})
})

module.exports = router;