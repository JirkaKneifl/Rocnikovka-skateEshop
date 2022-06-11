class AdminAddProductsSentDTO{
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

    constructor(nazev,cena,popis,vaha, sirka, delka, ID_kategorie, ID_vyrobce, cesta_obrazekProduktu, dodatecneInfoProduktu){
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

    static FromRequest(req) {
        return new AdminProductsSentDTO(
          req.body.nazev,
          req.body.cena,
          req.body.popis,
          req.body.vaha,
          req.body.sirka,
          req.body.delak,
          req.body.ID_kategorie,
          req.body.ID_vyrobce,
          req.body.cesta_obrazekProduktu,
          req.body.dodatecneInfoProduktu
        );
      }
}
module.exports = AdminAddProductsSentDTO;