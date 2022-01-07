const spojeni = require('../databaseConection');

const express = require('express');

const bcrypt = require('bcrypt');


function DataZDB(req, res){

    bcrypt.compare(myPlaintextPassword, hash).then(function(result) {
        // result == true
    });

};

module.exports = DataZDB