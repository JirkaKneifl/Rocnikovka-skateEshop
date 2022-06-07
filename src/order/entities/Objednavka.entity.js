class Objednavka{
    cislo;
    dat_prijeti;
    dat_expedice;
    zam_prijal;
    zam_zpracoval;
    zam_expedoval;
    jmeno;
    prijmeni;
    telefon;
    email;
    ulice_cp;
    psc;
    mesto;
    Popis;
    Stav;
    celkovaCena;
    radekObjednavky;

    constructor(cislo, dat_prijeti, dat_expedice, zam_prijal, zam_zpracoval, zam_expedoval, jmeno, prijmeni, telefon, email, ulice_cp,psc, mesto, Popis, Stav,celkovaCena, radekObjednavky){
        this.cislo = cislo;
        this.dat_prijeti = dat_prijeti;
        this.dat_expedice = dat_expedice;
        this.zam_expedoval = zam_expedoval;
        this.zam_prijal = zam_prijal;
        this.zam_zpracoval = zam_zpracoval;
        this.jmeno = jmeno;
        this.prijmeni = prijmeni;
        this.telefon = telefon;
        this.email = email;
        this.ulice_cp = ulice_cp;
        this.psc = psc;
        this.mesto = mesto;
        this.Popis = Popis;
        this.Stav = Stav;
        this.celkovaCena = celkovaCena;
        this.radekObjednavky = radekObjednavky;
    }
}
module.exports = Objednavka;