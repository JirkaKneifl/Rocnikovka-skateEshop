const express = require("express");
const router = express.Router();
const ModelCategory = require('../modules/ModelCategory');
const ModelProduct = require('../modules/ModelProduct');
const ModelCart = require('../modules/ModelCart');
var validator = require('validator');
const VypoctiCelkovouCenu = require('../VypoctiCelkovouCenu');

router.get('/', async function(req, res){
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
    res.render('../views/cartPage/index.ejs', { categoriesTree, dataPridejDoKosikuSession , CelkovaCena });
    req.session.resetMaxAge()
});




router.post('/', async function(req, res){
    if(!req.session.dataPridejDoKosiku || req.session.dataPridejDoKosiku.length === undefined ){
        req.session.dataPridejDoKosiku = [];
    }
    const categoriesTree = await ModelCategory.SelectAllCategories();//ulozeni JSON objektu do categoriesTree
    const ID_produktu = req.body.IDproduktu;
    const CenaJednePolozky = await ModelProduct.SelectDataJednohoProduktu(ID_produktu);

    
    //abych vypocital celkovou cenu:
    // musim projet session produktu v kosiku zjistim mnozstvi dane polozky
    // pak projedu ProduktyInfo abych zjistil cenu u dané položky  
    // tyhle dva udaje vezmu a vynasobim je -> dostanu celkovou cenu jednoho produktu (zahrnuje cenu na mnozstvi...)
    // celkovou cenu jednoho produktu pridam do session k dane polozce...
    // v html kosiku zpracuju sesion a vyberu si celkovou cenu dane polozky u vsech polozek -> a následně tyhle vsechny celkove ceny sectu a vypisu jako celkovou cenu celeho kosiku

    
   
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
});


router.get('/delete/:ID_produktu', async function(req, res){
    req.session.dataPridejDoKosiku = req.session.dataPridejDoKosiku.filter(polozka => {
        return polozka.IDproduktu != req.params.ID_produktu;
    })
    
    res.redirect('/kosik')
    req.session.resetMaxAge();
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