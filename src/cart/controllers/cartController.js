const express = require("express");
const router = express.Router();
const VypoctiCelkovouCenu = require('../../../VypoctiCelkovouCenu');
const CartSentDTO = require('../dto/cart-sent.dto');
const ProxyKosikSession = require('../../helpers/proxy-cart-session');
const KatalogService = require('../../katalog/services/katalog.service')
const katalogService = new KatalogService();
const PolozkaVKosiku = require('../../cart/entities/cart.entity')

router.get('/', async function(req, res){
    const dto = CartSentDTO.FromRequest(req);
    const errors = req.session.errors;
    const categoriesTree = await katalogService.ListKategorii();//ulozeni JSON objektu do categoriesTree
    const proxyKosikuSession = new ProxyKosikSession(req);
    
        
    
    
    res.render('indexCart', { categoriesTree, dataPridejDoKosikuSession: proxyKosikuSession.session , CelkovaCena: proxyKosikuSession.celkovaCena() , errors});
});




router.post('/', async function(req, res){
    const dto = CartSentDTO.FromRequest(req);
    const proxyKosikuSession = new ProxyKosikSession(req);
    const detailProduktu = await katalogService.DetailProduktu(dto.ID_produktu);

    
   proxyKosikuSession.add(new PolozkaVKosiku(
       dto.nazev,
       dto.mnozstvi,
       dto.ID_produktu,
       dto.obrazekProduktu,
       detailProduktu.cena
   ))


    res.redirect('/kosik');
});


router.get('/delete/:ID_produktu', async function(req, res){
    const proxyKosikuSession = new ProxyKosikSession(req);
    proxyKosikuSession.remove(req.params.ID_produktu);
   
    res.redirect('/kosik')
});

router.post('/uprava-mnozstvi/:ID_produktu', function(req, res) {
    const proxyKosikuSession = new ProxyKosikSession(req);
    proxyKosikuSession.update(req.params.ID_produktu, req.body.noveMnozstvi)
    
    res.status(201);
    res.send();
});



module.exports = router;