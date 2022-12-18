const express = require('express');
const router = new express.Router();
const AuthMiddleware = require('../middleware/auth');
const User = require('../models/user') ;



router.get('/', AuthMiddleware ,(req, res) => {

    var user = req.user ;
    var admin = user.admin ;
    res.render('index',{admin}) ;
    
});

router.get('/FAQ',async(req,res) => {

    res.render('FAQ') ;

}) ;



module.exports = router;





