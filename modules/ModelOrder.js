const spojeni = require("./databaseConection");

function query(sql, parametry) {
    return new Promise(function(resolve, reject){
        try {
            spojeni.query(sql, parametry, function(err, results){
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

async function InsertDoObjednavky_Produkty(ID_produktu, nazveProduktu, ID_objednavky, CenaProduktu, mnozstviVObjednavce) {
    return query(`INSERT INTO objednavky_produkty VALUES
    (?, ?, ?, ?, ?)`
    , [ID_produktu, nazveProduktu, ID_objednavky, CenaProduktu, mnozstviVObjednavce]);
  }

 function InsertDoObjednavky(jmeno, prijmeni, telefon, email, ulice_cp, psc, mesto, popis, celkovaCenaObjednavky){
    return query(`INSERT INTO objednavky VALUES
    (
        null, 
        NOW(),
        null,
        null,
        null,
        null,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        1,
        ?
         )`, [jmeno, prijmeni, telefon, email, ulice_cp, psc, mesto, popis, celkovaCenaObjednavky]
    )
};




module.exports = {
    InsertDoObjednavky_Produkty,
    InsertDoObjednavky,
    };