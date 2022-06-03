const spojeni = require("../../../databaseConection");

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


//funkce kera vytvori strukturu stromu katergorií
async function SelectAllCategories() {
    const categories = await query(`SELECT * FROM kategorie;`)
    
    return categories.filter(category => category.ID_kat_nadrazene === null).map(category => ({
        ...category, 
        podkategorie: categories.filter(podCategory => podCategory.ID_kat_nadrazene === category.ID_kategorie)
    }))
    
}


module.exports = {
    SelectAllCategories, 
};
