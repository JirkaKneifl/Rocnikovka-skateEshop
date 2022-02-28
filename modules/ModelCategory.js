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

function SelectDeskyCategory(){
    return query('SELECT * FROM kategorie WHERE ID_kat_nadrazene = 1;')
}

module.exports = {
    SelectMainCategory, 
    SelectDeskyCategory,
};
