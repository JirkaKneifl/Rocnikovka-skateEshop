const express = require("express");
const router = express.Router();
const ModelCategory = require('../modules/ModelCategory');
const ModelProduct = require('../modules/ModelProduct');
const ModelOrder = require('../modules/ModelOrder');
var validator = require('validator');
const { on } = require("../modules/databaseConection");

router.post('/', async function(req, res){
    const categoriesTree = await ModelCategory.SelectAllCategories();
    const dataPridejDoKosikuSession = req.session.dataPridejDoKosiku;
    
    console.log(req.body.jmeno)
    console.log(req.body.prijmeni)
    console.log(req.body.telefon)
    console.log(req.body.email)
    console.log(req.body.uliceČP)
    console.log(req.body.psč)
    console.log(req.body.mesto)
    console.log(req.body.poznamkaKObjednavce)
    console.log(req.body.souhlasObchodnichPodminek)
    
    await ModelOrder.InsertDoObjednavky_Produkty(ID_produktu, ID_objednavky, aktualniCenaProduktu, mnozstviVObjednavce);
    /*
     if (!validator.isLength(req.body.jmeno, {min: 2})) {
        console.log("jmeno")
        res.status(400).send();
    }
    if (!validator.isLength(req.body.prijmeni, {min: 2})) {
        console.log("prijmeni")
        res.status(400).send();
    }
    if (!validator.isMobilePhone(req.body.telefon, 'cs-CZ' , {min: 9})) {
        console.log("telefon")
        res.status(400).send();
    }
    if (!validator.isEmail(req.body.email)) {
        console.log("email")
        res.status(400).send();
    }
    if (!validator.isLength(req.body.uliceČP, {min: 2})) {
        console.log("uliceCP")
        res.status(400).send();
    }
    if (!validator.isLength(req.body.psč, {min: 5})) {
        console.log("psč")
        res.status(400).send();
    }
    if (!validator.isLength(req.body.mesto, {min: 2})) {
        console.log("mesto")
        res.status(400).send();
    }
    if (!validator.isBoolean(req.body.souhlasObchodnichPodminek, {loose: on})) {
        console.log("souhlasPodminek")
        res.status(400).send();
    }*/
    
    /*dataPridejDoKosikuSession.forEach(produkt => {
         ID_produktu = produkt.IDproduktu;
         mnozstviVObjednavce = req.body.mnozstviProduktu;

    });

    ModelCart.InsertDoObjednavky_Produkty(ID_produktu, ID_objednavky, aktualniCenaProduktu, mnozstviVObjednavce);
    */


    res.render('../views/cartPage/succesOrder.ejs', { categoriesTree , dataPridejDoKosikuSession})
});

module.exports = router;