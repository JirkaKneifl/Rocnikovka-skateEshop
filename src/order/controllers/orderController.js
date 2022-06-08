const express = require("express");
const router = express.Router();
const VypoctiCelkovouCenu = require('../../../VypoctiCelkovouCenu');
const OrderSentDTO = require("../dto/order-sent.dto")
const OrderService = require("../services/order.service")
const orderService = new OrderService();
const OrderAcceptedMail = require("../../mail/entities/OrderAcceptedMail.entity")
const MailSenderService = require('../../mail/mail-sender.service');
const mailSenderService = new MailSenderService();
const KatalogService = require('../../katalog/services/katalog.service')
const katalogService = new KatalogService();
const ProxyKosikSession = require('../../helpers/proxy-cart-session')


router.post('/', async function(req, res){
    const categoriesTree = await katalogService.ListKategorii();
    const dto = OrderSentDTO.FromRequest(req);
    const proxyKosikuSession = new ProxyKosikSession(req.session);
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

   orderService.VytvorObjednavku(dto, proxyKosikuSession)

    const orderAcceptedMail = new OrderAcceptedMail(
        '"Ore Mauntains Downhill Media" <Jirka.kneifl@email.cz>',
        dto.email,
        "Ore Mauntains Downhill Shop - Přijali jsme objednávku",
        ""
    );
    orderAcceptedMail.render(
        dto.jmeno, 
        dto.prijmeni, 
        dto.telefon, 
        dto.email, 
        dto.uliceČP,
        dto.psc,
        dto.mesto,
        dto.poznamkaKObjednavce,
        VypoctiCelkovouCenu(proxyKosikuSession.session), 
        proxyKosikuSession.session
        )

        mailSenderService.send(orderAcceptedMail);

    res.render('succesOrder', { categoriesTree , dataPridejDoKosikuSession: proxyKosikuSession.session})
    await dto.session.save();
});

module.exports = router;