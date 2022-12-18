

const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const AuthMiddleware = require('../middleware/auth');
const chalk = require('chalk');


/**
 * POST /search
 * Search 
*/
router.post('/search',async(req, res) => {
    
    try {

      let searchTerm = req.body.searchTerm;
      let product_list = await Product.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
      let product_count = product_list.length ;

      console.log(product_list) ;

      res.render('products', { title: 'Searched Product', product_list , product_count } );

    } catch (error) {

      res.status(500).send({message: error.message || "Error Occured" });

    }
    
}) ;


module.exports = router ;





