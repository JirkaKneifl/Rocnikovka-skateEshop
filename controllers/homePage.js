const express = require("express");
const router = express.Router();
const MainCategory = require('../modules/ModelMainCategori');

router.get('/', async function (req, res){
    const categories = await MainCategory.SelectMainCategori();
    console.log(categories)
    res.render('../views/homePage/index.ejs', {...data, products})
})

module.exports = router;