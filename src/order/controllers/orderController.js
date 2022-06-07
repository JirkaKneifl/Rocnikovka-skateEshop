const express = require("express");
const router = express.Router();
const ModelCategory = require('../../katalog/moduls/ModelCategory');
const VypoctiCelkovouCenu = require('../../../VypoctiCelkovouCenu');
const fs = require('fs');
const ejs = require('ejs');
const nodemailer = require("nodemailer");
const session = require("express-session");
const OrderSentDTO = require("../dto/order-sent.dto")
const OrderService = require("../services/order.service")

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
    
   const Objednavka = new OrderService.VytvorObjednavku(dto, dataPridejDoKosikuSession);

    const HTMLMailData = await ejs.renderFile(__dirname + '/../views/mailPrijmutiObjednavky.ejs', { 
        dataPridejDoKosikuSession: dataPridejDoKosikuSession,
        jmeno: dto.jmeno,
        prijmeni: dto.prijmeni,
        telefon: dto.telefon,
        email: dto.email, 
        uliceČP: dto.uliceČP,
        psč: dto.psč, 
        mesto: dto.mesto, 
        poznamkaKObjednavce: dto.poznamkaKObjednavce, 
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