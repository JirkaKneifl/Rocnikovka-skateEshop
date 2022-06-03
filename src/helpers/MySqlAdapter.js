var mysql = require('mysql');
 
class MySqlAdapter {
    pripojeni;
 
    constructor(host, user, password, database) {
        this.pripojeni = mysql.createConnection({
            host,
            user,
            password,
            database,
        });
    }
 
    connect() {
        this.pripojeni.connect(function(err) {
            if (err) throw err;
            console.log("Pripojeno!");
        });
    }
 
    query(sql, parametry) {
        return new Promise((resolve, reject) => {
            try {
                this.pripojeni.query(sql, parametry, function (err, results) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(results);
                });
            } catch (err) {
                reject(err);
            }
        });
    }
}
 
module.exports = MySqlAdapter;