var spojeni = require('../databaseConection');
var express = require('express');
var router = express.Router();


router.post('/register', function(req, res, next) {
    console.log("sem se to dostalo register.js")//testovaci consol.log
      // uchovava vsechny data z imputu 
      const dataZakazniku=req.body;
     
      // vlozeni zakaznickych udaju do tabulky zakaznici
      var sql = 'INSERT INTO zakaznici SET ?';
      spojeni.query(sql, dataZakazniku, function (err, data) { 
          if (err) throw err;
             console.log("Data byli importovány spravne"); 
      });
     res.redirect('/registerOk');  // redirect -> presunuti na form stranku
    next();
    }); 

    module.exports = router;

