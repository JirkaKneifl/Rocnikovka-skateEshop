const express = require('express');

const router = express.Router();
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const KatalogService = require('../../katalog/services/katalog.service');

const katalogService = new KatalogService();
const OrderService = require('../../order/services/order.service');

const orderService = new OrderService();
const LoginService = require('../services/login.service');

const loginService = new LoginService();
const Zamestnanec = require('../entities/Zamestnanec.entity');

const MailSenderService = require('../../mail/mail-sender.service');

const mailSenderService = new MailSenderService();
const OrderExpendedMail = require('../../mail/entities/OrderExpendedMail.entity');

const transporter = nodemailer.createTransport({
  host: 'localhost', // adresa serveruz v dockeru
  port: 25, // port dockeru
  secure: false, // true for 465, false for other ports
});

// routa na login
router.get('/', (req, res) => {
  res.render('indexLogin');
});

router.get('/admin-sekce', async (req, res) => {
  const categoriesTree = await katalogService.ListKategorii();
  const VsechnyObjednavky = await orderService.ListVsechObjednavek();
  const infoZamestnanceSession = req.session.infoZamestnanec;

  res.render('indexAdminSection', { infoZamestnanceSession, VsechnyObjednavky, categoriesTree });
});

router.post('/admin-sekce', async (req, res) => {
  const categoriesTree = await katalogService.ListKategorii();
  const VsechnyObjednavky = await orderService.ListVsechObjednavek();
  const infoZamestnanec = await loginService.Login(req.body.email, req.body.heslo);

  // ověřuju jestli to vratilo objekt třídy zaměstnance
  if (infoZamestnanec instanceof Zamestnanec) {
    req.session.infoZamestnanec = infoZamestnanec;
    const infoZamestnanceSession = req.session.infoZamestnanec;
    res.render('indexAdminSection', { infoZamestnanceSession, VsechnyObjednavky, categoriesTree });
  } else {
    res.redirect('/login');
  }
});

router.get('/admin-sekce/:cisloObjednavky', async (req, res) => {
  const categoriesTree = await katalogService.ListKategorii();
  const objednavka = await orderService.DetailObjednavky(req.params.cisloObjednavky);

  res.render('detailObjednavky', { objednavka, categoriesTree });
});

router.get('/admin-sekce/expedovat/:cisloObjednavky', async (req, res) => {
  await orderService.Expedovat(req.params.cisloObjednavky);
  const objednavka = await orderService.DetailObjednavky(req.params.cisloObjednavky);
  console.log('Objednavka: ', objednavka);
  const orderExpendedMail = new OrderExpendedMail(
    '"Ore Mauntains Downhill Media" <Jirka.kneifl@email.cz>',
    objednavka.email,
    'Ore Mauntains Downhill Shop - Přijali jsme objednávku',
    '',
  );
  orderExpendedMail.render(
    objednavka.jmeno,
    objednavka.prijmeni,
    objednavka.telefon,
    objednavka.email,
    objednavka.ulice,
    objednavka.psc,
    objednavka.mesto,
    objednavka.Popis,
    objednavka.celkovaCena,
    objednavka.radekObjednavky,
  );

  mailSenderService.send(orderExpendedMail);

  res.redirect('/login/admin-sekce/');
});

module.exports = router;
