const express = require("express");
const router = express.Router();
const ModelCategory = require('../../katalog/moduls/ModelCategory');
const ModelProduct = require('../../katalog/moduls/ModelProduct');
const ModelCart = require('../../cart/moduls/ModelCart');
var validator = require('validator');
const VypoctiCelkovouCenu = require('../../../VypoctiCelkovouCenu');

router.get('/', async function(req, res){
    const errors = req.session.errors;
    console.log(errors);
    const categoriesTree = await ModelCategory.SelectAllCategories();//ulozeni JSON objektu do categoriesTree
    const dataPridejDoKosikuSession = req.session.dataPridejDoKosiku;
    var CelkovaCena = 0;

    if (dataPridejDoKosikuSession) {
        dataPridejDoKosikuSession.forEach(element => {
            console.log("element.mnozstvi: ", element.mnozstvi)
            
        });
        CelkovaCena = VypoctiCelkovouCenu(dataPridejDoKosikuSession);
    }
        
    
    
    console.log("req.session.cookie.maxAge: " + req.session.cookie.maxAge)
    res.render('indexCart', { categoriesTree, dataPridejDoKosikuSession , CelkovaCena , errors});
    req.session.resetMaxAge()
    await req.session.save();
});




router.post('/', async function(req, res){
    if(!req.session.dataPridejDoKosiku || req.session.dataPridejDoKosiku.length === undefined ){
        req.session.dataPridejDoKosiku = [];
        
    }
    const categoriesTree = await ModelCategory.SelectAllCategories();//ulozeni JSON objektu do categoriesTree
    const ID_produktu = req.body.IDproduktu;
    const CenaJednePolozky = await ModelProduct.SelectCenaJednohoProduktu(ID_produktu);

    const dataPridejDoKosikuNovouPolozku = 
        {
            nazev: req.body.nazev,
            mnozstvi: req.body.mnozstvi,
            IDproduktu: ID_produktu,
            obrazekProduktu: req.body.obrazekProduktu,
            CenaJednePolozky: CenaJednePolozky
        }
    req.session.dataPridejDoKosiku = [...req.session.dataPridejDoKosiku , dataPridejDoKosikuNovouPolozku] ; //vytvorim nove pole do ktereho zkopiruju stare a pridam na konec novou polozku
    const dataPridejDoKosikuSession = req.session.dataPridejDoKosiku;

    

    
    res.redirect('/kosik');
    console.log("dataPridejDoKosikuSession: ", dataPridejDoKosikuSession)
    req.session.resetMaxAge();
    await req.session.save();
});


router.get('/delete/:ID_produktu', async function(req, res){
    req.session.dataPridejDoKosiku = req.session.dataPridejDoKosiku.filter(polozka => {
        return polozka.IDproduktu != req.params.ID_produktu;
    })
    
    res.redirect('/kosik')
    req.session.resetMaxAge();
    await req.session.save();
});

router.post('/uprava-mnozstvi/:ID_produktu', function(req, res) {
    req.session.dataPridejDoKosiku = req.session.dataPridejDoKosiku.map(polozka => {
        if (polozka.IDproduktu == req.params.ID_produktu) {
            return {
                ...polozka, 
                mnozstvi: req.body.noveMnozstvi //tady menim nozstvy dane polozky a potom returnuju polozku s tímto zmenenym mnozstvim
            };
        }else {
            return polozka; //polozka ktera se nemneni
        }
    })
    res.status(201);
    res.send();
});



module.exports = router;