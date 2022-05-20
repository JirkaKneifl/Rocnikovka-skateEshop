const spojeni = require("./databaseConection");

function query(sql) {
    return new Promise(function(resolve, reject){
        try {
            spojeni.query(sql, function(err, results){
                if(err){
                    return reject(err);
                }
                return resolve(results);
            })
        } catch (err) {
            reject(err);
        }
    })
}

async function InsertDoObjednavky_Produkty(ID_produktu, ID_objednavky, aktualniCenaProduktu, mnozstviVObjednavce) {
    return query(`INSERT INTO objednavky_produkty ('${ID_produktu}', '${ID_objednavky}' , '${aktualniCenaProduktu}' , '${mnozstviVObjednavce}')`);
  }

async function InsertDoObjednavky(){
    return query(`INSERT INTO objednavky (null, NOW(), )`)
};

async function InsertDoZakaznici(){
    return query(`INSERT INTO zakaznici`)
};



module.exports = {
    InsertDoObjednavky_Produkty,
    InsertDoObjednavky,
    InsertDoZakaznici
    };