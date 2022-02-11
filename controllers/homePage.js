const express = require('express');
const router = express.Router();

//routa na homepage
router.get('/',  function (req, res) {
    res.render('homePage/index')    
})

module.exports = router;