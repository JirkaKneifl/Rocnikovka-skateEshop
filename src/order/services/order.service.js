const databaseConection = require('../../helpers/databaseConection');
const Objednavka = require('../entities/Objednavka.entity');
const Objednavka_Produkt = require('../entities/Objednavka_Produkt.entity');
const Stav = require('../entities/Stav.entity');

class OrderService {
  spojeni;

  constructor() {
    this.spojeni = databaseConection;
  }

  async VytvorObjednavku(dto, sessionPolozkay) {
    await this.spojeni.query(`INSERT INTO objednavky VALUES(
            null, 
            NOW(),
            null,
            null,
            null,
            null,
            ?,?,?,?,?,?,?,?,1,?
        )`, [
      dto.jmeno,
      dto.prijmeni,
      dto.telefon,
      dto.email,
      dto.ulice,
      dto.psc,
      dto.mesto,
      dto.popis,
      sessionPolozkay.celkovaCena(),
    ]);

    await Promise.all(sessionPolozkay.req.session.cart.map((sessionPolozka) => this.spojeni.query(
      'INSERT INTO objednavky_produkty VALUES(?, ?, ?, ?, ?)',
      [
        sessionPolozka.ID_produktu,
        sessionPolozka.nazveProduktu,
        sessionPolozka.ID_objednavky,
        sessionPolozka.CenaProduktu,
        sessionPolozka.mnozstviVObjednavce,
      ],
    )));
  }

  async ListVsechObjednavek() {
    const listVsechObjednavek = await this.spojeni.query('SELECT * FROM objednavky LEFT JOIN stavyobjednavek ON objednavky.ID_stav = stavyobjednavek.ID_stav ORDER BY objednavky.dat_prijeti DESC');
    return listVsechObjednavek.map((objednavka) => new Objednavka(
      objednavka.cislo,
      objednavka.dat_prijeti,
      objednavka.dat_expedice,
      objednavka.zam_prijal,
      objednavka.zam_zpracoval,
      objednavka.zam_expedoval,
      objednavka.jmeno,
      objednavka.prijmeni,
      objednavka.telefon,
      objednavka.email,
      objednavka.ulice,
      objednavka.psc,
      objednavka.mesto,
      objednavka.Popis,
      new Stav(
        objednavka.ID_stav,
        objednavka.nazev,
      ),
      objednavka.celkovaCena,
    ));
  }

  async Expedovat(cisloObjednavky) {
    this.spojeni.query('UPDATE objednavky SET ID_stav = 0 WHERE cislo = ?', [cisloObjednavky]);
  }

  async DetailObjednavky(cisloObjednavky) {
    const objednavky = await this.spojeni.query('SELECT * FROM objednavky LEFT JOIN stavyobjednavek ON objednavky.ID_stav = stavyobjednavek.ID_stav WHERE objednavky.cislo = ?', [cisloObjednavky]);
    const objednavka = objednavky[0];
    console.log(objednavka);

    const radkyObjednavky = await this.spojeni.query('SELECT * FROM objednavky_produkty WHERE ID_objednavky = ?', [cisloObjednavky]);

    return new Objednavka(
      objednavka.cislo,
      objednavka.dat_prijeti,
      objednavka.dat_expedice,
      objednavka.zam_prijal,
      objednavka.zam_zpracoval,
      objednavka.zam_expedoval,
      objednavka.jmeno,
      objednavka.prijmeni,
      objednavka.telefon,
      objednavka.email,
      objednavka.ulice,
      objednavka.psc,
      objednavka.mesto,
      objednavka.Popis,
      new Stav(
        objednavka.ID_stav,
        objednavka.nazev,
      ),
      objednavka.celkovaCena,
      radkyObjednavky.map((radek) => new Objednavka_Produkt(
        radek.ID_produktu,
        radek.nazevProduktu,
        radek.ID_objednavky,
        radek.CenaProduktu,
        radek.mnozstviVObjednavce,
      )),
    );
  }
}

module.exports = OrderService;
