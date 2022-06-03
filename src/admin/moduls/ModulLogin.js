const spojeni = require("../../../databaseConection");

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

async function SlectZamestnance(email) {
  return query(`SELECT * FROM Zamestnanci WHERE email = ?`, [email]);
}

module.exports = {
  SlectZamestnance
  };
