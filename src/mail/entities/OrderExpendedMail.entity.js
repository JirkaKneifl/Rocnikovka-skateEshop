const ejs = require('ejs');

class OrderExpendedMail {
  
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

  async render(jmeno, prijmeni, telefon, email, ulice, psc, mesto, Popis, celkovaCena, radekObjednavky) {
    this.html = await ejs.renderFile(`${__dirname}/../../order/views/mailOdexpedovano.ejs`, {
      jmeno,
      prijmeni,
      telefon,
      email,
      ulice,
      psc,
      mesto,
      Popis,
      celkovaCena,
      radekObjednavky,
    });
  }
}
module.exports = OrderExpendedMail;
