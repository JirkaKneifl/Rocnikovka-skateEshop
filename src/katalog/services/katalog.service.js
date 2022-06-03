const spojeni = require('../../helpers/databaseConection');

class KatalogService{

    spojeni;

    constructor(spojeni){
        this.spojeni = spojeni;
    }

    async ListKategorii (){
        const ListKategorii = await this.spojeni.query(`SELECT * FROM kategorie;`);

        return ListKategorii.filter(category => category.ID_kat_nadrazene === null).map(category => ({
            ...category, 
            podkategorie: ListKategorii.filter(podCategory => podCategory.ID_kat_nadrazene === category.ID_kategorie)
        }))
    }

    async DetailProduktu(ID_produktu) {
        const detailProduktu = await this.spojeni.query(`SELECT * FROM produkty WHERE ID_produktu = ?`, [ID_produktu])
        return detailProduktu;
    }

    async ListProdukuZPodkategorie(ID_kategorie){
        const produktyPodkategorie = await this.spojeni.query(`SELECT * FROM produkty WHERE ID_kategorie = ?`, [ID_kategorie])
        return produktyPodkategorie;
    }

    async ListVsechProduktu(ID_kategorie){
        const listVsechProduktu = await this.spojeni.query(`SELECT * FROM produkty WHERE ID_kategorie IN (SELECT ID_kategorie FROM kategorie WHERE ID_kat_nadrazene = ?);`, [ID_kategorie])
        return listVsechProduktu;
    }
}

module.exports = KatalogService;