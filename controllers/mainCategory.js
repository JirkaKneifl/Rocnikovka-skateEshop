const express = require("express");
const router = express.Router();
const MainCategory = require('../modules/ModelMainCategori');//test

router.get('/', async function (req, res, next){
    data = await MainCategory.SelectMainCategori();
    console.log(data)
    res.render('../views/homePage/index.ejs')
    res.render('./layouts/partials/nav-bar', {
        MainData: data
    })
    
})

module.exports = router;