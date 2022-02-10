const spojeni = require("./databaseConection");
//test
function SelectMainCategori() {
    return new Promise(function(resolve, reject){
        try {
            let sql = `SELECT * FROM kategorie WHERE ID_kat_nadrazene IS NULL;`;
            spojeni.query(sql, function(err, results){
                if(err){
                    return reject(err);
                }
                return resolve(results);
            })
        } catch (err) {
            reject(err);
            throw err
        }
    })
}

module.exports.SelectMainCategori = SelectMainCategori;
