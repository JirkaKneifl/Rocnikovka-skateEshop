const express = require("express");
const router = express.Router();
const ModelProduktu = require('../modules/ModelProduct')
const ModelCategory = require('../modules/ModelCategory');

router.get('/:ID_hlavniKategorie/:ID_podkategorie?', async function (req, res){ // -> /k/:hlavniKategorie/:podkategorie?
    const { ID_hlavniKategorie, ID_podkategorie } = req.params;
    const NadKategorieProdukty = await ModelProduktu.SelectDataNadKategorieProduktu(parseInt(ID_hlavniKategorie));
    const PodKetegorieProdukty = await ModelProduktu.SelectDataPodKategorieProduktu(parseInt(ID_podkategorie));

    const StromProduktu = await ModelProduktu.SelectDataNadKategorieProduktu(ID_hlavniKategorie, ID_podkategorie)

    const categoriesTree = await ModelCategory.SelectAllCategories();//ulozeni JSON objektu do categoriesTree 
    

    //2 query 
    /*if (ID_podkategorie === undefined){
        res.render('../views/productPage/index.ejs', {NadKategorieProdukty, categoriesTree})
    }else{
        res.render('../views/productPage/index.ejs', {PodKetegorieProdukty, categoriesTree})
    }*/
    console.log(StromProduktu)
    //console.log(parseInt(ID_podkategorie))
    //console.log(req.params)
})

module.exports = router;