const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const router = express.Router();
const ModulLogin = require('../modules/ModulLogin')

//routa na login
router.get('/', function(req, res) {
    res.render('login/index')
})

router.post("/", async function (req, res) {
	try {
	  const {email, heslo} = req.body;

	  ModulLogin.DataZDB(email , function (err, result){
		  if(err) {
			  console.log(err)
		  }
		  else{
			for (let i = 0; i < result.length; i++) {
				if(email == result[i].email && bcrypt.compareSync(heslo, result[i].heslo)) { //{result} to je objekt ketry projedu forcyklem a jeho index porovnam s emailem a heslem z imputu
					return res.render('homepage/index');//navrat na homepage
				}
				
			} 
		  }
	  })
	} 
	catch {
	  
	}
  });

/*
function DataZDB(req, res) {
	const {email, heslo} = req.body;
 
	spojeni.query(`SELECT * FROM zakaznici WHERE email = '${email}'`, function (err, result) {
		if(err) {
			console.log(err);
		}

		//console.log("vysledek: " + result + result.length)
		for (let i = 0; i < result.length; i++) {
			if(email == result[i].email && bcrypt.compareSync(heslo, result[i].heslo)) { //{result} to je objekt ketry projedu forcyklem a jeho index porovnam s emailem a heslem z imputu
				return res.redirect('/');//navrat na homepage
			}
			
		}
	})
}
*/
module.exports = router;