const express = require('express');

const router = express.Router();
const CartSentDTO = require('../dto/cart-sent.dto');
const ProxyKosikSession = require('../../helpers/proxy-cart-session');
const KatalogService = require('../../katalog/services/katalog.service');

const katalogService = new KatalogService();
const PolozkaVKosiku = require('../entities/cart.entity');

router.get('/', async (req, res) => {
  const { errors } = req.session;
  const categoriesTree = await katalogService.ListKategorii();// ulozeni JSON objektu do categoriesTree
  const proxyKosikuSession = new ProxyKosikSession(req);

  res.render('indexCart', {
    categoriesTree, dataPridejDoKosikuSession: proxyKosikuSession.req.session.cart, CelkovaCena: proxyKosikuSession.celkovaCena(), errors,
  });
});

router.post('/', async (req, res) => {
  const dto = CartSentDTO.FromRequest(req);
  const proxyKosikuSession = new ProxyKosikSession(req);
  const detailProduktu = await katalogService.DetailProduktu(dto.ID_produktu);

  proxyKosikuSession.add(new PolozkaVKosiku(
    dto.nazev,
    dto.mnozstvi,
    dto.ID_produktu,
    dto.obrazekProduktu,
    detailProduktu.cena,
  ));

  res.redirect('/kosik');
});

router.get('/delete/:ID_produktu', async (req, res) => {
  const proxyKosikuSession = new ProxyKosikSession(req);
  proxyKosikuSession.remove(req.params.ID_produktu);

  res.redirect('/kosik');
});

router.post('/uprava-mnozstvi/:ID_produktu', (req, res) => {
  const proxyKosikuSession = new ProxyKosikSession(req);
  proxyKosikuSession.update(req.params.ID_produktu, req.body.noveMnozstvi);

  res.status(201);
  res.send();
});

module.exports = router;
