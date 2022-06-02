const express = require("express");
const router = express.Router();
const ModelCategory = require('../modules/ModelCategory');
const ModelProduct = require('../modules/ModelProduct');
const ModelOrder = require('../modules/ModelOrder');
var validator = require('validator');
const VypoctiCelkovouCenu = require('../VypoctiCelkovouCenu');
const fs = require('fs');
const ejs = require('ejs');
const nodemailer = require("nodemailer");
const session = require("express-session");

let transporter = nodemailer.createTransport({
    host: "localhost",//adresa serveruz v dockeru
    port: 25,//port dockeru
    secure: false, // true for 465, false for other ports
  });



router.post('/', async function(req, res){
    const errors = {};
    req.body.souhlasObchodnichPodminek = req.body.souhlasObchodnichPodminek === "on";
    
    if (!validator.isLength(req.body.jmeno, {min: 2})) {
        errors.jmeno = "Jmeno je povinné"
    }
    if (!validator.isLength(req.body.prijmeni, {min: 2})) {
        errors.prijmeni = "Příjmení je povinné"
    }
    if (!validator.isMobilePhone(req.body.telefon, 'cs-CZ' , {min: 9})) {
        errors.telefon = "Telefon je špatně zadán"
    }
    if (!validator.isEmail(req.body.email)) {
        errors.email = "Email je špatně zadán"
    }
    if (!validator.isLength(req.body.uliceČP, {min: 2})) {
        errors.uliceČP = "Ulice a č.p. je špatně zadáno"
    }
    if (!validator.isLength(req.body.psč, {min: 5})) {
        errors.psč = "PSČ je špatně zadáno"
    }
    if (!validator.isLength(req.body.mesto, {min: 2})) {
        errors.mesto = "Město je špatně zadáno"
    }
    if (!validator.isBoolean("" + req.body.souhlasObchodnichPodminek, {loose: false})) {
        errors.souhlasObchodnichPodminek = "Je vyžadován Váš souhas"
    }
    if(Object.keys(errors).length){//je nejaky error proto pošlu status 400 a ktomu json erroru a returnu aby se neprovedl dalsi kod
        const errorsObject = {}
        Object.entries(req.body).forEach(entry => {
            errorsObject[entry[0]] = {
            hodnota: entry[1],
            error: errors[entry[0]]
            }
        })
        req.session.errors = errorsObject;
        console.log(req.session.errors, errorsObject)
        await req.session.save();
        res.redirect('/kosik')
        return
    }

    const categoriesTree = await ModelCategory.SelectAllCategories();
    const dataPridejDoKosikuSession = req.session.dataPridejDoKosiku;
    await req.session.save();
    
    const celkovaCenaObjednavky = VypoctiCelkovouCenu(dataPridejDoKosikuSession);
    
    const InsertDoObjednavky = await ModelOrder.InsertDoObjednavky(
        req.body.jmeno, req.body.prijmeni,
        req.body.telefon, req.body.email, 
        req.body.uliceČP, req.body.psč, 
        req.body.mesto, 
        req.body.poznamkaKObjednavce, 
        celkovaCenaObjednavky
        )

    await Promise.all(dataPridejDoKosikuSession.map(polozka => {// kdyz mi vznikne více zapisu do DB tak zapisuju vsechny najednou a cekam az vsechny skonci
        return ModelOrder.InsertDoObjednavky_Produkty(polozka.IDproduktu, polozka.nazev, InsertDoObjednavky.insertId, polozka.CenaJednePolozky ,polozka.mnozstvi)   
    }));

   console.log(dataPridejDoKosikuSession)

    const HTMLMailData = await ejs.renderFile(__dirname + '/../views/layouts/mailToSend.ejs', { 
        dataPridejDoKosikuSession: dataPridejDoKosikuSession,
        jmeno: req.body.jmeno,
        prijmeni: req.body.prijmeni,
        telefon: req.body.telefon,
        email: req.body.email, 
        uliceČP: req.body.uliceČP,
        psč: req.body.psč, 
        mesto: req.body.mesto, 
        poznamkaKObjednavce: req.body.poznamkaKObjednavce, 
        celkovaCenaObjednavky: celkovaCenaObjednavky
    })

    let info = await transporter.sendMail({
        from: '"Ore Mauntains Downhill Media" <Jirka.kneifl@email.cz>', // sender address
        to: req.body.email, // list of receivers
        subject: "Ore Mauntains Downhill Shop - Přijali jsme objednávku", // Subject line
        text: "Vaše objednávka na Severe Downhill Shop byla dokončena!", // plain text body
        html: HTMLMailData
      });

    res.render('../views/cartPage/succesOrder.ejs', { categoriesTree , dataPridejDoKosikuSession})
});

module.exports = router;