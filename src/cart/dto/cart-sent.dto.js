class CartSentDTO {

    ID_produktu;
    nazev;
    mnozstvi;
    obrazekProduktu;


    constructor(ID_produktu, nazev, mnozstvi, obrazekProduktu) {
        this.ID_produktu = ID_produktu;
        this.nazev = nazev;
        this.mnozstvi = mnozstvi;
        this.obrazekProduktu = obrazekProduktu;
    }

    static FromRequest(req){
        return new CartSentDTO (
            req.body.ID_produktu,
            req.body.nazev,
            req.body.mnozstvi,
            req.body.obrazekProduktu
        )
    }
}

module.exports = CartSentDTO;