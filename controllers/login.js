const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const ModulLogin = require('../modules/ModulLogin')
const ModelOrder = require('../modules/ModelOrder')

//routa na login
router.get('/', function(req, res) {
    res.render('login/index')
})

router.get('/admin-sekce', async function(req, res) {
	const VsechnyObjednavky = await ModelOrder.SelectVsechnyObjednavky();
	const infoZamestnanceSession = req.session.infoZamestnanec;

    res.render('../views/adminSection/index.ejs', { infoZamestnanceSession, VsechnyObjednavky })
})

router.post('/admin-sekce', async function(req, res) {
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
		res.render('../views/adminSection/index.ejs', { infoZamestnanceSession, VsechnyObjednavky })
	}
});

router.get('/admin-sekce/:cisloObjednavky', async function (req, res) {
	const [objednavka, radkyObjednavky] = await ModelOrder.SelectJednaObjednavka(req.params.cisloObjednavky);

	res.render('../views/adminSection/detailObjednavky.ejs', { objednavka, radkyObjednavky})
});

router.get('/admin-sekce/expedovat/:cisloObjednavky', async function (req, res) {
	await ModelOrder.Expedovat(req.params.cisloObjednavky);

	res.redirect('/login/admin-sekce/')
});

module.exports = router;