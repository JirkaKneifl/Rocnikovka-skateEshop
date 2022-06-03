const express = require("express");
const router = express.Router();
const ModelCategory = require('../../katalog/moduls/ModelCategory');
const ModelProduct = require('../../katalog/moduls/ModelProduct');
const ModelOrder = require('../../order/moduls/ModelOrder');
var validator = require('validator');
const VypoctiCelkovouCenu = require('../../../VypoctiCelkovouCenu');
const fs = require('fs');
const ejs = require('ejs');
const nodemailer = require("nodemailer");
const session = require("express-session");
const OrderSentDTO = require("../dto/order-sent.dto")


let transporter = nodemailer.createTransport({
    host: "localhost",//adresa serveruz v dockeru
    port: 25,//port dockeru
    secure: false, // true for 465, false for other ports
  });



router.post('/', async function(req, res){
    const dto = OrderSentDTO.FromRequest(req);
    const errors = dto.isValid();
    
    
   
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

    const HTMLMailData = await ejs.renderFile(__dirname + '/../views/mailPrijmutiObjednavky.ejs', { 
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
        text: "", // plain text body
        html: HTMLMailData
      });

    res.render('succesOrder', { categoriesTree , dataPridejDoKosikuSession})
});

module.exports = router;