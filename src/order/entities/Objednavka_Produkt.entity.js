class Objednavka_Produkt {
  ID_produktu;

  nazevProduktu;

  ID_objednavky;

  CenaProduktu;

  mnozstviVObjednavce;

  constructor(ID_produktu, nazevProduktu, ID_objednavky, CenaProduktu, mnozstviVObjednavce) {
    this.ID_produktu = ID_produktu;
    this.nazevProduktu = nazevProduktu;
    this.ID_objednavky = ID_objednavky;
    this.CenaProduktu = CenaProduktu;
    this.mnozstviVObjednavce = mnozstviVObjednavce;
  }
}
module.exports = Objednavka_Produkt;
