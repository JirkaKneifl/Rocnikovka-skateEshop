var validator = require('validator');

class OrderSentDTO {

    jmeno;
    prijmeni;
    email;
    telefon;
    uliceČP; 
    psc;
    mesto;
    popis;
    souhlas;  

    constructor (jmeno, prijmeni, email, telefon, uliceČP,psc, mesto, popis, souhlas) {
        this.jmeno = jmeno;
        this.prijmeni = prijmeni;
        this.email = email;
        this.telefon = telefon;
        this.uliceČP = uliceČP;
        this.psc = psc;
        this.mesto = mesto;
        this.popis = popis;
        this.souhlas = souhlas === 'on';
    }

    static FromRequest (req) {
        return new OrderSentDTO (
            req.body.jmeno, req.body.email,
            req.body.tele, req.body.telefon,
            req.body.uliceČP,
            req.body.psc,
            req.body.mesto,
            req.body.popis
            )
    }

    isValid () {
        const errors = {};

        if (!validator.isLength(this.jmeno, {min: 2})) {
            errors.jmeno = "Jmeno je povinné"
        }
        if (!validator.isLength(this.prijmeni, {min: 2})) {
            errors.prijmeni = "Příjmení je povinné"
        }
        if (!validator.isMobilePhone(this.telefon, 'cs-CZ' , {min: 9})) {
            errors.telefon = "Telefon je špatně zadán"
        }
        if (!validator.isEmail(this.email)) {
            errors.email = "Email je špatně zadán"
        }
        if (!validator.isLength(this.uliceČP, {min: 2})) {
            errors.uliceČP = "Ulice a č.p. je špatně zadáno"
        }
        if (!validator.isLength(this.psč, {min: 5})) {
            errors.psč = "PSČ je špatně zadáno"
        }
        if (!validator.isLength(this.mesto, {min: 2})) {
            errors.mesto = "Město je špatně zadáno"
        }
        if (!validator.isBoolean("" + this.souhlasObchodnichPodminek, {loose: false})) {
            errors.souhlasObchodnichPodminek = "Je vyžadován Váš souhas"
        }

        return errors;
    }


}

module.exports = OrderSentDTO;