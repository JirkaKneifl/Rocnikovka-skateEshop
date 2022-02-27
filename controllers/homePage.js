const express = require('express');
const router = express.Router();
const MainCategory = require('../modules/ModelMainCategori');

//routa na homepage
router.get('/', async function (req, res){
    data = await MainCategory.SelectMainCategori();
    console.log(data)
    res.render('../views/homePage/index.ejs', {data})    
})

module.exports = router;