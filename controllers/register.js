var spojeni = require('../databaseConection');
var express = require('express');
var router = express.Router();



function DataDoDB (req, res ){
      const {jmeno, prijmeni, telefon, email, heslo} = req.body //konstatnta ve které se uloží data z formu

          //vložíme hodnoty z formuláře do databaze
        spojeni.query(`INSERT INTO zakaznici(jmeno, prijmeni, telefon, email, heslo) VALUES ('${jmeno}','${prijmeni}', '${telefon}','${email}','${heslo}')`, 
        function (err){
              if(err) {
                console.log(err);
              }else {
                console.log("Data se importovali dobře")
                return res.redirect('/registerOk'); //redirektuju na registerOk.js
                  
          }
      })  
    };

module.exports.DataDoDB = DataDoDB;   

