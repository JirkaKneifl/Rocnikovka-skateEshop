const express = require("express");
const router = express.Router();

router.get('/k/:hlavniKategorie/:podkategorie?', function (req, res){ // -> /k/:hlavniKategorie/:podkategorie?
    const {hlavniKategorie, podKategorie} = req.params;

    //2 query 

    
})

module.exports = router;