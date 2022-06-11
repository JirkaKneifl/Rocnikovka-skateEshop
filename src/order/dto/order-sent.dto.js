const validator = require('validator');

class OrderSentDTO {
  jmeno;

  prijmeni;

  email;

  telefon;

  ulice;

  psc;

  mesto;

  popis;

  souhlas;

  constructor(jmeno, prijmeni, email, telefon, ulice, psc, mesto, popis, souhlas) {
    this.jmeno = jmeno;
    this.prijmeni = prijmeni;
    this.email = email;
    this.telefon = telefon;
    this.ulice = ulice;
    this.psc = psc;
    this.mesto = mesto;
    this.popis = popis;
    this.souhlas = souhlas === 'on';
  }

  static FromRequest(req) {
    return new OrderSentDTO(
      req.body.jmeno,
      req.body.prijmeni,
      req.body.email,
      req.body.telefon,
      req.body.ulice,
      req.body.psc,
      req.body.mesto,
      req.body.poznamkaKObjednavce,
      req.body.souhlasObchodnichPodminek,
    );
  }

  isValid() {
    const errors = {};

    if (!validator.isLength(this.jmeno, { min: 2 })) {
      errors.jmeno = 'Jmeno je povinné';
    }
    if (!validator.isLength(this.prijmeni, { min: 2 })) {
      errors.prijmeni = 'Příjmení je povinné';
    }
    if (!validator.isMobilePhone(this.telefon, 'cs-CZ', { min: 9 })) {
      errors.telefon = 'Telefon je špatně zadán';
    }
    if (!validator.isEmail(this.email)) {
      errors.email = 'Email je špatně zadán';
    }
    if (!validator.isLength(this.ulice, { min: 2 })) {
      errors.ulice = 'Ulice a č.p. je špatně zadáno';
    }
    if (!validator.isLength(this.psc, { min: 5 })) {
      errors.psc = 'PSČ je špatně zadáno';
    }
    if (!validator.isLength(this.mesto, { min: 2 })) {
      errors.mesto = 'Město je špatně zadáno';
    }
    if (!validator.isBoolean(`${this.souhlas}`, { loose: false })) {
      errors.souhlasObchodnichPodminek = 'Je vyžadován Váš souhas';
    }

    return errors;
  }
}

module.exports = OrderSentDTO;
