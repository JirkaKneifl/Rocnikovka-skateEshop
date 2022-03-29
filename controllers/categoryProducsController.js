const express = require("express");
const router = express.Router();
const ModelProduktu = require('../modules/ModelProduct')

router.get('/:ID_hlavniKategorie/:ID_podkategorie?', async function (req, res){ // -> /k/:hlavniKategorie/:podkategorie?
    const {ID_hlavniKategorie, ID_podkategorie} = req.params;
    const NadKategorieProdukty = await ModelProduktu.SelectDataNadKategorieProduktu();
    const PodKetegorieProdukty = await ModelProduktu.SelectDataPodKategorieProduktu();

    //2 query 
    if (ID_podkategorie == undefined){
        res.render('../views/productPage/index.ejs', {NadKategorieProdukty})
    }else{
        res.render('../views/productPage/index.ejs', {PodKetegorieProdukty})
    }

    console.log(NadKategorieProdukty)
    console.log(PodKetegorieProdukty)
})

module.exports = router;