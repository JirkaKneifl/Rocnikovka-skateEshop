const databaseConection = require('../../helpers/databaseConection');
const Kategorie = require('../entities/Kategorie.entity');
const Produkt = require('../entities/Produkt.entity');

class KatalogService {
  spojeni;

  constructor() {
    this.spojeni = databaseConection;
  }

  async ListKategorii() {
    const ListKategorii = await this.spojeni.query('SELECT * FROM kategorie;');

    return ListKategorii
      .filter((category) => category.ID_kat_nadrazene === null)
      .map((category) => new Kategorie(
        category.ID_kategorie,
        category.nazev,
        category.ID_kat_nadrazene,
        ListKategorii
          .filter((podCategory) => podCategory.ID_kat_nadrazene === category.ID_kategorie)
          .map((podCategory) => new Kategorie(podCategory.ID_kategorie, podCategory.nazev, podCategory.ID_kat_nadrazene)),
      ));
  }

  async DetailProduktu(ID_produktu) {
    const [detailProduktu] = await this.spojeni.query('SELECT * FROM produkty WHERE ID_produktu = ?', [ID_produktu]);
    return new Produkt(
      detailProduktu.ID_produktu,
      detailProduktu.nazev,
      detailProduktu.cena,
      detailProduktu.popis,
      detailProduktu.vaha,
      detailProduktu.sirka,
      detailProduktu.delka,
      detailProduktu.ID_kategorie,
      detailProduktu.ID_vyrobce,
      detailProduktu.cesta_obrazekProduktu,
      detailProduktu.dodatecneInfoProduktu,
    );
  }

  async ListProdukuZPodkategorie(ID_kategorie) {
    const listProduktyPodkategorie = await this.spojeni.query('SELECT * FROM produkty WHERE ID_kategorie = ?', [ID_kategorie]);
    return listProduktyPodkategorie.map((produkt) => new Produkt(
      produkt.ID_produktu,
      produkt.nazev,
      produkt.cena,
      produkt.popis,
      produkt.vaha,
      produkt.sirka,
      produkt.delka,
      produkt.ID_kategorie,
      produkt.ID_vyrobce,
      produkt.cesta_obrazekProduktu,
      produkt.dodatecneInfoProduktu,
    ));
  }

  async ListVsechProduktu(ID_kategorie) {
    const listVsechProduktu = await this.spojeni.query('SELECT * FROM produkty WHERE ID_kategorie IN (SELECT ID_kategorie FROM kategorie WHERE ID_kat_nadrazene = ?);', [ID_kategorie]);
    return listVsechProduktu.map((produkt) => new Produkt(
      produkt.ID_produktu,
      produkt.nazev,
      produkt.cena,
      produkt.popis,
      produkt.vaha,
      produkt.sirka,
      produkt.delka,
      produkt.ID_kategorie,
      produkt.ID_vyrobce,
      produkt.cesta_obrazekProduktu,
      produkt.dodatecneInfoProduktu,
    ));
  }
}

module.exports = KatalogService;
