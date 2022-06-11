class PolozkaVKosiku {
  nazev;

  mnozstvi;

  ID_produktu;

  obrazekProduktu;

  CenaJednePolozky;

  constructor(nazev, mnozstvi, ID_produktu, obrazekProduktu, CenaJednePolozky) {
    this.nazev = nazev;
    this.mnozstvi = mnozstvi;
    this.ID_produktu = ID_produktu;
    this.obrazekProduktu = obrazekProduktu;
    this.CenaJednePolozky = CenaJednePolozky;
  }
}
module.exports = PolozkaVKosiku;
