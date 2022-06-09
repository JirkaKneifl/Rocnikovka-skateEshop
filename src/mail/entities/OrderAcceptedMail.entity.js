const ejs = require('ejs');

class OrderAcceptedMail {
  from;

  to;

  subject;

  text;

  html;

  constructor(from, to, subject, text) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.text = text;
  }

  async render(jmeno, prijmeni, telefon, email, ulice, psc, mesto, poznamkaKObjednavce, celkovaCenaObjednavky, dataPridejDoKosikuSession) {
    this.html = await ejs.renderFile(`${__dirname}/../../order/views/mailPrijmutiObjednavky.ejs`, {
      jmeno,
      prijmeni,
      telefon,
      email,
      ulice,
      psc,
      mesto,
      poznamkaKObjednavce,
      celkovaCenaObjednavky,
      dataPridejDoKosikuSession,
    });
  }
}
module.exports = OrderAcceptedMail;
