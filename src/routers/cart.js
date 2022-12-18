const express = require('express');
const chalk = require('chalk');
const AuthMiddleware = require('../middleware/auth');
const ProductController = require('../controllers/product');
const router = new express.Router();

router.get('/cart', AuthMiddleware, async(req, res) => {
    ProductController.getCart(req.user)
        .then(({ products, cart_total }) => {
            res.render('cart', {
                products,
                cart_total
            });
        })
        .catch((e) => {
            console.log(chalk.red(`ERROR: ${e}`));
            res.render('error', {
                error_code: 500
            });
        });
});

router.post('/add_to_cart', AuthMiddleware, async(req, res) => {
    // FIXME: If BUY button is pressed.
    ProductController.addToCart({
            'user': req.user,
            'product_id': req.body.product_id,
            'qty': req.body.product_qty
        })
        .then((resp) => {
            res.redirect('/cart');
        })
        .catch((e) => {
            console.log(chalk.red(`ERROR: ${e}`));
            res.render('error', {
                error_code: 500
            });
        });
});

router.post('/remove_from_cart', AuthMiddleware, async(req, res) => {
    ProductController.removeFromCart({
            'user': req.user,
            'product_id': req.body.product_id,
            'qty': req.body.product_qty
        })
        .then((resp) => {
            res.redirect('/cart');
        })
        .catch((e) => {
            console.log(chalk.red(`ERROR: ${e}`));
            res.render('error', {
                error_code: 500
            });
        });
});

router.post('/checkout_cart', AuthMiddleware, async(req, res) => {
    if (req.user.cart.length == 0) {
        res.redirect('/products');
    } else {
        ProductController.checkoutCart(req.user)
            .then((resp) => {
                // TODO: Empty cart also.
                //console.log(res) ;
                //console.log("Error here");
                res.redirect('/shipinfo');
            })
            .catch((e) => {
                console.log(chalk.red(`ERROR: ${e}`));
                res.render('error', {
                    error_code: 500
                });
            });
    }
});

module.exports = router;