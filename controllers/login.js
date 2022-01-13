const spojeni = require('../databaseConection');
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');


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

module.exports.DataZDB = DataZDB;