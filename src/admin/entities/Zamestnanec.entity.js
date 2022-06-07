class Zamestnanec{
    ID_zamestnance;
    jmeno;
    prijmeni;
    dat_narozeni;
    adresa_bydliste;
    mesto;
    telefon;
    email;
    dat_nastoupeni;
    ID_pozice;

    constructor(ID_zamestnance, jmeno, prijmeni, dat_narozeni, adresa_bydliste, mesto, telefon, email, dat_nastoupeni, ID_pozice) {
        this.ID_zamestnance = ID_zamestnance;
        this.jmeno = jmeno;
        this.prijmeni = prijmeni;
        this.dat_narozeni = dat_narozeni;
        this.adresa_bydliste = adresa_bydliste;
        this.mesto = mesto;
        this.telefon = telefon;
        this.email = email;
        this.dat_nastoupeni = dat_nastoupeni;
        this.ID_pozice = ID_pozice;
    }
}
module.exports = Zamestnanec;