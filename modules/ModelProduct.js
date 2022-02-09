const spojeni = require("../modules/databaseConection");

//test
function SelectPruduct() {
  spojeni.query(`SELECT 
    nazev, 
    cena, 
    popis, 
    vaha, 
    sirka, 
    delka, 
    cesta_obrazekProduktu, 
    dodatecneInfoProduktu 
    FROM produkty`, function(err) {
        if(err){
            throw err;
        }
    }
  );
}

module.exports = SelectPruduct;
