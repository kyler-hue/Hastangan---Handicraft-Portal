
const Artist = require('../models/artist') ;
const express = require('express');
const router = express.Router();


router.get('/deleteArtist/:id',  async(req, res)=> {

    try{

      
      let paramsId = req.params.id ;
      console.log("Delete Artist is Called for id :" + paramsId );
      const str = await Artist.deleteOne({ _id : paramsId });

      res.redirect('/view-artist') ;
    }
    catch(error)
    {
        console.log("Error" + error);
        res.redirect('/view-artist') ;
    }

});

router.get('/viewArtist/:id',  async(req, res)=> {

  try{

    
    let paramsId = req.params.id ;
    //console.log("Delete Artist is Called for id :" + paramsId );
    const artist = await Artist.findById({_id:paramsId}) ;
    res.render('artistProfile',{artist}) ;

  }
  catch(error)
  {
      console.log("Error" + error);
      res.redirect('/view-artist') ;
  }

});

router.get('/updateArtist/:id',  async(req, res)=> {

  try{

    let paramsId = req.params.id ;
    
    

    res.redirect('/view-artist') ;
  }
  catch(error)
  {
      console.log("Error" + error);
      res.redirect('/view-artist') ;
  }

});

module.exports = router ;

