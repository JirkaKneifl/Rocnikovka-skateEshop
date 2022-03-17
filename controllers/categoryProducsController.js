const express = require("express");
const router = express.Router();
const ModelProduktu = require('../modules/ModelProduct')

router.get('/kategorie/:ID_hlavniKategorie/:ID_podkategorie?', function (req, res){ // -> /k/:hlavniKategorie/:podkategorie?
    const {ID_hlavniKategorie, ID_podkategorie} = req.params;
    const produkty = ModelProduktu.SelectDataProduktu();
    //2 query 
    console.log(produkty)

    if (ID_podkategorie == undefined){
        
    }else{

    }
    
})

module.exports = router;