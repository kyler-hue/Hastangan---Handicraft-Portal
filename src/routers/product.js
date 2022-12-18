const express = require('express');
const router = new express.Router();
const Product = require('../models/product');
const AuthMiddleware = require('../middleware/auth');
const chalk = require('chalk');

router.get('/products', async(req, res) => {

    try {

        
        const product_list = await Product.find({});
        const product_count = await Product.find({}).countDocuments();
        console.log( "Get is Called " + req.body );
        res.render('products', {
            product_list,
            product_count
        });

    } catch (e) {

        console.log(chalk.red(`ERROR: ${e}`));
        res.render('error', {
            error_code: 500
        });
    }
});

router.post('/products', async(req, res) => {

    try {

        var sortVal = 1 ;
        const canSortBy = ["title","price"]
        //const sorting = document.getElementsByClassName('sorting').value ;
        console.log( "Post is Called " + sorting );
        const product_list = await Product.find({});
        const product_count = await Product.find({}).countDocuments();

        res.render('products', {
            product_list,
            product_count
        });

    } catch (e) {

        console.log(chalk.red(`ERROR: ${e}`));
        res.render('error', {
            error_code: 500
        });
    }
});

// for single product
router.get('/product', async(req, res) => {
    try {
        product = await Product.findById(req.query.id);
        if (!product) {
            res.render('error', {
                error_code: 404
            });
        }
        res.render('product_page', { product });
    } catch (e) {
        console.log(chalk.red(`ERROR: ${e}`));
        res.render('error', {
            error_code: 404
        });
    }
});

// for single product
router.post('/product', AuthMiddleware, async(req, res) => {
    product = await Product.findById(req.body.product_id);
    if (!product) {
        res.render('error', {
            error_code: 404
        });
    }
    // TODO: To change & complete route
    res.send();
});

router.post('/productByCategory',async(req, res) => {
    
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
module.exports = router;