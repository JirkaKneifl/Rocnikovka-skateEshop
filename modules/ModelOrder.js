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
    return query(`INSERT INTO objednavky_produkty VALUES(?, ?, ?, ?, ?)`, [ID_produktu, nazveProduktu, ID_objednavky, CenaProduktu, mnozstviVObjednavce]);
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

async function SelectVsechnyObjednavky(){
    return query(`SELECT * FROM objednavky LEFT JOIN stavyobjednavek ON objednavky.ID_stav = stavyobjednavek.ID_stav ORDER BY objednavky.dat_prijeti DESC`)
};

async function SelectJednaObjednavka(cisloObjednavky){
    const objednavky =  await query(`SELECT * FROM objednavky LEFT JOIN stavyobjednavek ON objednavky.ID_stav = stavyobjednavek.ID_stav WHERE objednavky.cislo = ?`, [cisloObjednavky])
    const objednavka = objednavky[0];

    const radkyObjednavky = await query(`SELECT * FROM objednavky_produkty WHERE ID_objednavky = ?`, [cisloObjednavky])

    return [objednavka, radkyObjednavky];
};

async function Expedovat(cisloObjednavky){
    return query(`UPDATE objednavky SET ID_stav = 0 WHERE cislo = ?`, [cisloObjednavky])
};


module.exports = {
    InsertDoObjednavky_Produkty,
    InsertDoObjednavky,
    SelectVsechnyObjednavky,
    SelectJednaObjednavka,
    Expedovat
    };