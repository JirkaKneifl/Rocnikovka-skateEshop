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
function SelectMainCategory() {
    return query(`SELECT * FROM kategorie WHERE ID_kat_nadrazene IS NULL;`)
}

function SelectSecondCategory(){
    return query('SELECT * FROM kategorie WHERE  ID_kategorie = ID_kat_nadrazene ;')
}

module.exports = {
    SelectMainCategory, 
    SelectSecondCategory,
};
