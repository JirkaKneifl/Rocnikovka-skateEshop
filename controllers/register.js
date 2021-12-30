var spojeni = require('../databaseConection.js');
var bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();

router.get('/form', function(req, res, next) { 
    res.render('register'); //register.ejs
    });
    router.post('/create', function(req, res, next) {
      
      // uchovava vsechny data z imputu 
      const dataZakazniku=req.body;
     
      // vlozeni zakaznickych udaju do tabulky zakaznici
      var sql = 'INSERT INTO zakaznici SET ?';
      spojeni.query(sql, dataZakazniku,function (err, data) { 
          if (err) throw err;
             console.log("Data byli importovány spravne"); 
      });
     res.redirect('/register/form');  // redirect -> presunuti na form stranku
    }); 
    module.exports = router;
