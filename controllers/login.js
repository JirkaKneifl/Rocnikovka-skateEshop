const spojeni = require('../databaseConection');
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');


function DataZDB(req, res) {
	const {email, heslo} = req.body;
    console.log(email, heslo);
 
	spojeni.query(`SELECT * FROM zakaznici WHERE email = '${email}'`, function (err, result) {
		if(err) {
			console.log(err);
		}
		console.log(result)
		for (let i = 0; i < result.length; i++) {
			if(email == result[i].email && bcrypt.compareSync(heslo, result[i].heslo)) {
				console.log(heslo);
				return res.redirect('/');//navrat na homepage
			}
			
		}
	})
}

module.exports.DataZDB = DataZDB;