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


//test
function SelectMainCategori() {
    return query(`SELECT * FROM kategorie WHERE ID_kat_nadrazene IS NULL;`)
}

module.exports = SelectMainCategori();
