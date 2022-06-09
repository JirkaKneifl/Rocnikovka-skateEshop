class Kategorie {
  ID_kategorie;

  nazev;

  ID_kat_nadrazene;

  podkategorie;

  constructor(ID_kategorie, nazev, ID_kat_nadrazene, podkategorie) {
    this.ID_kategorie = ID_kategorie;
    this.nazev = nazev;
    this.ID_kat_nadrazene = ID_kat_nadrazene;
    this.podkategorie = podkategorie;
  }
}

module.exports = Kategorie;
