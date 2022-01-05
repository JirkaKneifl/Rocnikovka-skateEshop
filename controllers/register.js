var spojeni = require('../databaseConection');
var express = require('express');
var router = express.Router();



exports.DataDoDB=(req, res)=>{
      const {jmeno, prijmeni, mobil, email, password} = req.body
      console.log(req.body)

      
          //vložíme hodnoty z formuláře do databaze
          spojeni.query(`INSERT INTO zakaznici(jmeno, prijmeni, mobil, email, heslo) VALUES ('${jmeno}','${prijmeni}', '${mobil}','${email}','${hashedPassword}')`, 
          (err, result) => {
              if(err) {
                  console.log(err);
              }else {
                  return res.redirect('/registerOk');
          }
      })  
};

    

