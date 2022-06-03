const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const ModulLogin = require('../../admin/moduls/ModulLogin')
const ModelOrder = require('../../order/moduls/ModelOrder')
const ModelCategory = require('../../katalog/moduls/ModelCategory')
const fs = require('fs');
const ejs = require('ejs');
const nodemailer = require("nodemailer");

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
	const categoriesTree = await ModelCategory.SelectAllCategories();
	const VsechnyObjednavky = await ModelOrder.SelectVsechnyObjednavky();
	const infoZamestnanceSession = req.session.infoZamestnanec;

    res.render('indexAdminSection', { infoZamestnanceSession, VsechnyObjednavky , categoriesTree})
})

router.post('/admin-sekce', async function(req, res) {
	const categoriesTree = await ModelCategory.SelectAllCategories();
	const VsechnyObjednavky = await ModelOrder.SelectVsechnyObjednavky();
	const infoZamestnanec = await ModulLogin.SlectZamestnance(req.body.email);
	const hesloZInputu = req.body.heslo;
	const emailZInputu = req.body.email;
	console.log(infoZamestnanec)
	console.log("heslo z inputu:",hesloZInputu)

	const hesloZDatabaze = infoZamestnanec[0].heslo;
	const emailZDatabaze = infoZamestnanec[0].email;
	console.log(hesloZDatabaze,"|" ,emailZDatabaze)

	if (emailZDatabaze == emailZInputu && await bcrypt.compare(hesloZInputu, hesloZDatabaze)) {
		req.session.infoZamestnanec = infoZamestnanec;
		const infoZamestnanceSession = req.session.infoZamestnanec;
		res.render('indexAdminSection', { infoZamestnanceSession, VsechnyObjednavky, categoriesTree })
	}else{
		res.redirect('/login')
	}
});

router.get('/admin-sekce/:cisloObjednavky', async function (req, res) {
	const categoriesTree = await ModelCategory.SelectAllCategories();
	const [objednavka, radkyObjednavky] = await ModelOrder.SelectJednaObjednavka(req.params.cisloObjednavky);

	res.render('detailObjednavky', { objednavka, radkyObjednavky, categoriesTree})
});

router.get('/admin-sekce/expedovat/:cisloObjednavky', async function (req, res) {
	await ModelOrder.Expedovat(req.params.cisloObjednavky);
	const objednavka = await ModelOrder.SelectJednaObjednavka(req.params.cisloObjednavky)
	console.log("Objednavka", objednavka)

	const HTMLMailData = await ejs.renderFile(__dirname + '/../views/layouts/mailOdexpedovano.ejs', { objednavka } )

	let info = await transporter.sendMail({
        from: '"Ore Mauntains Downhill Media" <Jirka.kneifl@email.cz>', // sender address
        to: objednavka[0].email, // list of receivers
        subject: "Ore Mauntains Downhill Shop - Odexpedovali jsme vaši objednávku", // Subject line
        text: "Vaše objednávka na Severe Downhill Shop byla dokončena!", // plain text body
        html: HTMLMailData
      });

	res.redirect('/login/admin-sekce/')
});

module.exports = router;