const express = require("express");
const router = express.Router();

router.get('/kategorie/-:ID_hlavniKategorie/-:ID_podkategorie?', function (req, res){ // -> /k/:hlavniKategorie/:podkategorie?
    const {ID_hlavniKategorie, ID_podkategorie} = req.params;

    //2 query 

    
})

module.exports = router;