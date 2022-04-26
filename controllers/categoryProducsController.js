const express = require("express");
const router = express.Router();
const ModelProduktu = require('../modules/ModelProduct')
const ModelCategory = require('../modules/ModelCategory');

//funkce pro generovani jednotlivych produktu
router.get('/produkty/:ID_produktu?', async function (req, res){ 
    const categoriesTree = await ModelCategory.SelectAllCategories();//ulozeni JSON objektu do categoriesTree
    const { ID_produktu } = req.params;

    const PorduktyInfo = await ModelProduktu.SelectDataJednohoProduktu(ID_produktu);
    res.render('../views/productPageInfo/index.ejs', {categoriesTree, PorduktyInfo})
}) 

//funkce rendrujici produkty do vypisu produktu dle dane URL id
router.get('/:ID_hlavniKategorie/:ID_podkategorie?', async function (req, res){ // -> /k/:hlavniKategorie/:podkategorie?
    const categoriesTree = await ModelCategory.SelectAllCategories();//ulozeni JSON objektu do categoriesTree
    const { ID_hlavniKategorie, ID_podkategorie } = req.params;

     if (ID_podkategorie === undefined) {
       const ID_kategorie = parseInt(ID_hlavniKategorie);

        const Produkty = await ModelProduktu.SelectVsechnyProdukty(ID_kategorie);
        res.render('../views/productPage/index.ejs', { categoriesTree, Produkty })
        //console.log(Produkty);
    } else {
       const ID_kategorie = parseInt(ID_podkategorie);

        const Produkty = await ModelProduktu.SelectProduktyZPodkategorie(ID_kategorie);
        res.render('../views/productPage/index.ejs', { categoriesTree, Produkty })
        //console.log(Produkty);
    }
}) 


router.post('/:ID_produktu?', async function (req, res){
    const categoriesTree = await ModelCategory.SelectAllCategories();//ulozeni JSON objektu do categoriesTree
    req.session.pocetNavstevProhlizece += 1;
    
   req.session.mnozstvi = req.body.mnozstvi
   console.log(req.body.mnozstvi)
   console.log(req.body.IDproduktu)

  

    res.render('../views/cartPage/index.ejs', { categoriesTree , mnozstvi: req.session.mnozstvi , pocetNavstevProhlizece: req.session.pocetNavstevProhlizece })
});



module.exports = router;