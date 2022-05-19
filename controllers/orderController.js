const express = require("express");
const router = express.Router();
const ModelCategory = require('../modules/ModelCategory');
const ModelProduct = require('../modules/ModelProduct');
const ModelCart = require('../modules/ModelCart');
var validator = require('validator');

router.post('/objednavka-odeslana', async function(req, res){
    const categoriesTree = await ModelCategory.SelectAllCategories();
    const dataPridejDoKosikuSession = req.session.dataPridejDoKosiku;
    
     if (!validator.isLength(req.body.jmeno, {min: 2})) {
        res.status(400).send();
    }
    if (!validator.isLength(req.body.prijmeni, {min: 2})) {
        res.status(400).send();
    }
    if (!validator.isMobilePhone(req.body.telefon, 'cs-CZ' , {min: 9})) {
        res.status(400).send();
    }
    if (!validator.isEmail(req.body.email)) {
        res.status(400).send();
    }
    if (!validator.isLength(req.body.uliceČP, {min: 2})) {
        res.status(400).send();
    }
    if (!validator.isLength(req.body.psč, {min: 5})) {
        res.status(400).send();
    }
    if (!validator.isLength(req.body.mesto, {min: 2})) {
        res.status(400).send();
    }
    if (!validator.isBoolean(req.body.souhlasObchodnichPodminek, {loose: true})) {
        res.status(400).send();
    }
    
    /*dataPridejDoKosikuSession.forEach(produkt => {
         ID_produktu = produkt.IDproduktu;
         mnozstviVObjednavce = req.body.mnozstviProduktu;

    });

    ModelCart.InsertDoObjednavky_Produkty(ID_produktu, ID_objednavky, aktualniCenaProduktu, mnozstviVObjednavce);
    */
    res.render('../views/cartPage/succesOrder.ejs', { categoriesTree , dataPridejDoKosikuSession})
});

module.exports = router;