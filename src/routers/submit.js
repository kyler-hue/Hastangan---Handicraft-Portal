const Recipe = require('../models/nonAuthProducts') ;
const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/auth');
const chalk = require('chalk');

/**
 * GET /submit-recipe
 * Submit Recipe
*/
router.get('/submit', async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit');
}) ;
  
/**
 * POST /submit-recipe
 * Submit Recipe
*/

router.post('/submit', async(req, res) => {
    
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
  
      const newRecipe = new Recipe({

          ProductName: req.body.product_name ,
          Image_URL: req.body.image_url ,
          Image: newImageName ,
          Category: req.body.category ,
          Price: req.body.price  ,
          Quantity: req.body.quantity , 
          ArtistName: req.body.artist_name, 
          ArtistId: req.body.artist_ID ,
          AadharId: req.body.artist_AadharID,
      });
      
      await newRecipe.save();
  
      req.flash('infoSubmit', 'Recipe has been added.')
      res.redirect('/submit');
      // res.render('/submit',{alert: `${first_name} has been updates.` } ) ;
      // {alert:`${ArtistName} your application for ${ProductName} hase been submitted Successfully !`}
    } catch (error) {

      res.json(error);
      req.flash('infoErrors', error);
      res.redirect('/submit');
    }

}) ;


module.exports = router ;







