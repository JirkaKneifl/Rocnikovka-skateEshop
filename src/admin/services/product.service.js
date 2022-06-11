const databaseConection = require('../../helpers/databaseConection');
const Produkt = require('../../katalog/entities/Produkt.entity');
const Vyrobce = require('../../admin/entities/Vyrobce.entity');

class ProductService {
  spojeni;

  constructor(){
    this.spojeni = databaseConection;
  }

  async ListProduktu(){
    const listVsechProduktu = await this.spojeni.query('SELECT * FROM produkty');
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

  async DetailProduktu(ID_produktu){
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

  async PridejProdukt(dto){
    await this.spojeni.query(`INSERT INTO produkty VALUES(
        null, 
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
    )`, [
        dto.nazev,
        dto.cena,
        dto.popis,
        dto.vaha,
        dto.sirka,
        dto.delka,
        dto.ID_produktu,
        dto.ID_vyrobce,
        dto.cesta_obrazekProduktu,
        dto.dodatecneInfoProduktu,
]);
  }


    async UpdateProdukt( ID_produktu, dto) {
      await this.spojeni.query(`UPDATE produkty SET
        nazev = ?,
        cena = ?,
        popis = ?,
        vaha = ?,
        sirka = ?,
        delka = ?,
        ID_kategorie = ?,
        ID_vyrobce = ?,
        cesta_obrazekProduktu = ?,
        dodatecneInfoProduktu = ? WHERE ID_produktu = ?`, 
        [
            dto.nazev,
            dto.cena,
            dto.popis,
            dto.vaha,
            dto.sirka,
            dto.delka,
            dto.ID_kategorie,
            dto.ID_vyrobce,
            dto.cesta_obrazekProduktu,
            dto.dodatecneInfoProduktu,
            ID_produktu
        ])
    }

    async RemoveProdukt(ID_produktu){
      await this.spojeni.query(`DELETE FROM produkty WHERE ID_produktu = ?`, [ID_produktu])
    }

    async ListVyrobcu(){
      const listVyrobcu = await this.spojeni.query(`SELECT * FROM vyrobci`);
      return listVyrobcu.map((vyrobce) => new Vyrobce(
        vyrobce.ID_vyrobce,
        vyrobce.nazev
      ));
    }
}
module.exports = ProductService;