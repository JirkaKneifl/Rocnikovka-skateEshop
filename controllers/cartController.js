const express = require("express");
const router = express.Router();
const ModelCategory = require('../modules/ModelCategory');
const ModelProduct = require('../modules/ModelProduct');
const ModelCart = require('../modules/ModelCart');
var validator = require('validator');

router.get('/', async function(req, res){
    const categoriesTree = await ModelCategory.SelectAllCategories();//ulozeni JSON objektu do categoriesTree
    const dataPridejDoKosikuSession = req.session.dataPridejDoKosiku;

    if (dataPridejDoKosikuSession) {
        dataPridejDoKosikuSession.forEach(element => {
            console.log("element.mnozstvi: ", element.mnozstvi)
        });
    }
        
    
    
    console.log("req.session.cookie.maxAge: " + req.session.cookie.maxAge)
    res.render('../views/cartPage/index.ejs', { categoriesTree, dataPridejDoKosikuSession  })
    req.session.resetMaxAge()
});




router.post('/', async function(req, res){
    if(!req.session.dataPridejDoKosiku || req.session.dataPridejDoKosiku.length === undefined ){
        req.session.dataPridejDoKosiku = [];
    }
    const categoriesTree = await ModelCategory.SelectAllCategories();//ulozeni JSON objektu do categoriesTree
    const ID_produktu = req.body.IDproduktu;
    const PorduktyInfo = await ModelProduct.SelectDataJednohoProduktu(ID_produktu);

    
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
            PorduktyInfo: PorduktyInfo
        }
    req.session.dataPridejDoKosiku = [...req.session.dataPridejDoKosiku , dataPridejDoKosikuNovouPolozku] ; //vytvorim nove pole do ktereho zkopiruju stare a pridam na konec novou polozku
    const dataPridejDoKosikuSession = req.session.dataPridejDoKosiku;

    console.log("dataPridejDoKosikuSession: ",dataPridejDoKosikuSession)
    
        for (let index = 0; index < dataPridejDoKosikuSession.length; index++) {
            
            dataPridejDoKosikuSession.forEach(element => {
                console.log("element.mnozstvi: ", element.mnozstvi)
                const mnozstviJendePolozky = element.mnozstvi;
         
                PorduktyInfo.forEach(element => {
                     console.log("element cena: ",element.cena)
                     const cenaJednePolozky = element.cena;
                     const cenaKuMnozstviJednePolozky = cenaJednePolozky * mnozstviJendePolozky;
                     console.log("cenaKuMnozstviJednePolozky: ",cenaKuMnozstviJednePolozky)
                });
             });
        }

    /*function VypoctiCelkovouCenu(){
        var celkovaCenaVsechProduktu = 0;
        var celkovaCenaProduktuDleIdNasobenaMnozstvim = 0;

        for(var i = 0; i < dataPridejDoKosikuSession.length; i++){
            
            var mnozstviJednohoProduktuDleID = dataPridejDoKosikuSession[i].mnozstvi;
            var cenaJednohoProduktuDleID = 0;
            console.log("mnozstviJednohoProduktuDleID: " + mnozstviJednohoProduktuDleID)
            console.log(dataPridejDoKosikuSession[i].PorduktyInfo);

            (dataPridejDoKosikuSession[i].PorduktyInfo).forEach(info => {
                console.log(info.cena);
                cenaJednohoProduktuDleID = info.cena;
            });
            celkovaCenaProduktuDleIdNasobenaMnozstvim = cenaJednohoProduktuDleID * mnozstviJednohoProduktuDleID;
        }
        

        return celkovaCenaVsechProduktu;
    };*/


    res.render('../views/cartPage/index.ejs', { categoriesTree, dataPridejDoKosikuSession , PorduktyInfo })
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