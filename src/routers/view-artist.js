
const Artist = require('../models/artist') ;
const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/auth');
const chalk = require('chalk');
const User = require('../models/user') ;

router.get('/view-artist', AuthMiddleware , async(req, res) => {

    const rows = await Artist.find({});
    var user = req.user ;
    var admin = user.admin ;
    res.render('view-artist',{rows,admin});
}) ;

router.get('/view-artist/:id', AuthMiddleware , async(req, res) => {

    console.log(req.params.id);
    const rows = await Artist.findById({_id:req.params.id});
    console.log(rows);
    res.render('view-artist-profile',{rows});
}) ;

router.post('/view-artist/:id', AuthMiddleware , async(req, res) => {

    try{

    // console.log("req body"+req.body);
   
    var first_name = req.body.first_name ;
    var last_name = req.body.last_name ;
    var email = req.body.email ;
    var address = req.body.address ;
    var state = req.body.state ;
    var district = req.body.district ;
    var taluka = req.body.taluka ;
    var village = req.body.village ;

    const row = await Artist.updateMany({_id:req.params.id},{$set:{

        first_name : first_name ,
        last_name : last_name ,
        email : email ,
        address : address ,
        State : state ,
        District : district ,
        Taluka : taluka ,
        Village : village 

    }});
    const rows = await Artist.findById({_id:req.params.id});
    console.log(rows);
    res.render('view-artist-profile',{rows});

    }
    catch(error)
    {
        res.render('error',{error_code:600});
    }
}) ;

module.exports = router ;


