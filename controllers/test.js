const express = require("express");
const router = express.Router();
const Test = require('../modules/ModelMainCategori');//test

router.get('/', async function test(req,res){
    data = await Test.SelectMainCategori();
    console.log(data)
    res.render('test/index', {
        MainData: data
    })
})

module.exports = router;