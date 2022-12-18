

const Recipe = require('../models/artist') ;
const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/auth');
const chalk = require('chalk');

/**
 * GET /submit-recipe
 * Submit Recipe
*/
router.get('/addArtist', async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('addArtist');
}) ;
  
/**
 * POST /submit-recipe
 * Submit Recipe
*/

router.post('/addArtist', async(req, res) => {
    
  try {
      let imageUploadFile;
      let uploadPath;
      let newImageName;
  
      if( !req.files || Object.keys(req.files).length === 0){
        console.log('No Files where uploaded.');
      } else {
  
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
        // newImageName = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" ;
  
        uploadPath = require('path').resolve('./') + '/public/assets/images/products' + newImageName;
  
        imageUploadFile.mv(uploadPath, function(err){
          if(err) return res.status(500).send(err);
        })
  
      }
  
      const obj = await Recipe.insertMany(
        [
          {

            Image: newImageName ,
    
            ArtistName: req.body.artist_name, 
            ArtistId: req.body.artist_ID ,
            ArtistAadhar: req.body.artist_AadharID,
            first_name: req.body.first_name ,
            last_name: req.body.last_name ,
            email: req.body.email ,
            phone: req.body.mobile ,
            Address: req.body.Address ,
            State: req.body.State ,
            District: req.body.District ,
            Taluka: req.body.Taluka ,
            Village: req.body.Village ,
            Pincode: req.body.pincode ,
            Image: req.body.image 
      },
        ]

      );
  
      req.flash('infoSubmit', 'Recipe has been added.')
      console.log(obj);
    } catch (error) {

      res.render('error', {
            error_code: 404
      });
      console.log(error) ;
    }

    res.render('addArtist',{alert:"Artist Added Successfully"});

}) ;


module.exports = router ;


