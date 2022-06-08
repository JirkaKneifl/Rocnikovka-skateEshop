const ejs = require('ejs');

class ObjednavkaPrijata{

    from;
    to;
    subject; 
    text;
    
    constructor(from,to,subject,text){
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.text = text;
    }

    async render(jmeno, prijmeni, telefon, email, uliceČP,psc,mesto,poznamkaKObjednavce,celkovaCenaObjednavky, proxyKosikuSession){
        this.html = await ejs.renderFile(__dirname + '/../views/mailPrijmutiObjednavky.ejs', { 
            jmeno,
            prijmeni,
            telefon,
            email, 
            uliceČP,
            psc,
            mesto, 
            poznamkaKObjednavce, 
            celkovaCenaObjednavky,
            proxyKosikuSession
        })
    }
}
module.exports = ObjednavkaPrijata;