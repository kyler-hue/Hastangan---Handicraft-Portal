const { request } = require('express');
const express = require('express');
const AuthMiddleware = require('../middleware/auth');
const router = new express.Router();
const User = require('../models/user') ;

router.get('/profile', AuthMiddleware, (req, res) => {

    console.log("get profile called") ;
    var user = req.user;
    var name = user.first_name + "  " + user.last_name ;
    var email = user.email;
    var first_name = user.first_name ;
    var last_name = user.last_name ;
    var err = req.query.err || '' ;
    res.render('profile', {
        name,
        email,
        first_name,
        last_name,
        err
    });
});

router.get('/profileChange', async(req, res) => {

    res.render("change-profile") ;

});

router.post('/profileChange', async(req, res) => {

    console.log("post profile called") ;
    console.log("Post for Save Changes") ;
    console.log("req"+req) ;
    const rows = await User.find({email:req.email});
    console.log("rows"+rows) ;
    
    
    const update = await User.updateOne(

        { _id:rows._id }, 
            {   
                first_name:req.first_name ,
                last_name:req.last_name ,
                email:req.email,
                password :req.password 
            }
        
        );
        var name = update.first_name ;
        var email = update.email ;
        var last_name = update.last_name ;
        var err = '' ;

        res.render('profile', {
            name,
            email,
            first_name,
            last_name,
            err
        });

}) ;
// TODO: Post methods for storing details & changing passwords

module.exports = router;