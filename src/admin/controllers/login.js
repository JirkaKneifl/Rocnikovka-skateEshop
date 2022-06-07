const express = require('express');
const router = express.Router();
const fs = require('fs');
const ejs = require('ejs');
const nodemailer = require("nodemailer");
const AdminLoginSentDTO = require('../dto/admin-login-sent.dto')
const KatalogService = require('../../katalog/services/katalog.service')
const katalogService = new KatalogService; 
const OrderService = require('../../order/services/order.service')
const orderService = new OrderService;
const LoginService = require('../../admin/services/login.service')
const loginService = new LoginService;
const Zamestnanec = require('../../admin/entities/Zamestnanec.entity');

let transporter = nodemailer.createTransport({
    host: "localhost",//adresa serveruz v dockeru
    port: 25,//port dockeru
    secure: false, // true for 465, false for other ports
  });

//routa na login
router.get('/', function(req, res) {
    res.render('indexLogin')
})

router.get('/admin-sekce', async function(req, res) {
	const categoriesTree = await katalogService.ListKategorii();
	const VsechnyObjednavky = await orderService.ListVsechObjednavek();
	const infoZamestnanceSession = req.session.infoZamestnanec;

    res.render('indexAdminSection', { infoZamestnanceSession, VsechnyObjednavky , categoriesTree})
})

router.post('/admin-sekce', async function(req, res) {
	const dto = AdminLoginSentDTO.FromRequest(req);
	
	const categoriesTree = await katalogService.ListKategorii();
	const VsechnyObjednavky = await orderService.ListVsechObjednavek();
	const infoZamestnanec = await loginService.Login(req.body.email, req.body.heslo);
	console.log(VsechnyObjednavky)
	

	

	if (infoZamestnanec instanceof Zamestnanec) {//ověřuju jestli to vratilo objekt třídy zaměstnance
		req.session.infoZamestnanec = infoZamestnanec;
		const infoZamestnanceSession = req.session.infoZamestnanec;
		res.render('indexAdminSection', { infoZamestnanceSession, VsechnyObjednavky, categoriesTree })
	}else{
		res.redirect('/login')
	}
});

router.get('/admin-sekce/:cisloObjednavky', async function (req, res) {
	const categoriesTree = await katalogService.ListKategorii();
	const objednavka = await orderService.DetailObjednavky(req.params.cisloObjednavky);

	res.render('detailObjednavky', { objednavka, categoriesTree})
});

router.get('/admin-sekce/expedovat/:cisloObjednavky', async function (req, res) {
	await orderService.Expedovat(req.params.cisloObjednavky);
	const objednavka = await orderService.DetailObjednavky(req.params.cisloObjednavky)
	console.log("Objednavka", objednavka)

	const HTMLMailData = await ejs.renderFile(__dirname + '/../../order/views/mailOdexpedovano.ejs', { objednavka } )

	let info = await transporter.sendMail({
        from: '"Ore Mauntains Downhill Media" <Jirka.kneifl@email.cz>', // sender address
        to: objednavka.email, // list of receivers
        subject: "Ore Mauntains Downhill Shop - Odexpedovali jsme vaši objednávku", // Subject line
        text: "Vaše objednávka na Severe Downhill Shop byla dokončena!", // plain text body
        html: HTMLMailData
      });

	res.redirect('/login/admin-sekce/')
});

module.exports = router;