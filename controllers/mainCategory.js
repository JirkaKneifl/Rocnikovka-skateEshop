const express = require("express");
const router = express.Router();
const MainCategory = require('../modules/ModelMainCategori');//test

router.get('/', async function (req,res){
    data = await MainCategory.SelectMainCategori();
    console.log(data)
    res.render('partials/nav-bar', {
        MainData: data
    })
})

module.exports = router;