const express = require("express");
const router = express.Router();
const MainCategory = require('../modules/ModelCategory');

router.get('/', async function (req, res){
    const categories = await MainCategory.SelectMainCategory();


    console.log(categories)
    res.render('../views/homePage/index.ejs', {categories})
})

module.exports = router;