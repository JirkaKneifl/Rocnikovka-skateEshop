class Produkt{
    ID_produktu;
    nazev;
    cena;
    popis;
    vaha;
    sirka;
    delka;
    ID_kategorie;
    ID_vyrobce;
    cesta_obrazekProduktu;
    dodatecneInfoProduktu;

    constructor(ID_produktu, nazev, cena, popis, vaha, sirka, delka, ID_kategorie, ID_vyrobce, cesta_obrazekProduktu, dodatecneInfoProduktu){
        this.ID_produktu = ID_produktu;
        this.nazev = nazev;
        this.cena = cena;
        this.popis = popis;
        this.vaha = vaha;
        this.sirka = sirka;
        this.delka = delka;
        this.ID_kategorie = ID_kategorie;
        this.ID_vyrobce = ID_vyrobce;
        this.cesta_obrazekProduktu = cesta_obrazekProduktu;
        this.dodatecneInfoProduktu = dodatecneInfoProduktu;
    }

}

module.exports = Produkt;