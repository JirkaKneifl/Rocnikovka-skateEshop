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

async function SelectCenaProduktu(ID_produktu) {
    return query(`SELECT cena FROM produkty WHERE ID_produktu = '${ID_produktu}'`);
  }

module.exports = {
    SelectCenaProduktu
    };