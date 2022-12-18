
const chalk = require('chalk');
const User = require('../models/user');
const Product = require('../models/product');

const addToCart = async(query) => {
    return new Promise(async(resolve, reject) => {
        try {
            const user = query.user;
            const product = await Product.findOne({ _id: query.product_id });
            const qty = query.qty;
            var productAdded = false;
            user.cart.forEach((item) => {
                if (item.product == product._id.toString()) {
                    item.qty += parseInt(qty);
                    productAdded = true;
                    return;
                }
            });
            if (!productAdded) {
                user.cart = user.cart.concat({ product, qty });
            }
            await user.save();
            console.log(chalk.green("PRODUCT ADDED TO CART!"));
            resolve(user);
        } catch (e) {
            reject(e);
        }
    });
}

const removeFromCart = async(query) => {
    return new Promise(async(resolve, reject) => {
        try {
            const user = query.user;
            const product = await Product.findOne({ _id: query.product_id });
            const qty = query.qty;
            user.cart.forEach((item) => {
                if (item.product == product._id.toString()) {
                    item.qty -= 1;
                    if (item.qty <= 0) {
                        user.cart = user.cart.filter((prod) => {
                            return prod.product != product._id.toString();
                        });
                    }
                    return;
                }
            });
            await user.save();
            console.log(chalk.green("PRODUCT REMOVED FROM CART!"));
            resolve(user);
        } catch (e) {
            reject(e);
        }
    });
}

const getCart = async(user) => {
    return new Promise(async(resolve, reject) => {
        try {
            await user.populate('cart.product').execPopulate();
            const products = user.cart ;
            //console.log(products) ;
            var cart_total = 0
            products.forEach((product) => {

                //console.log( typeof product.product.Price +" product Price") ;
                //console.log( typeof product.qty + " product.qty" ) ;
                var net_price = parseInt(product.product.Price) * parseInt(product.qty);
                product.net_price = net_price;
                cart_total += net_price;
            });
            console.log(cart_total+" getCart Called") ;
            resolve({ products, cart_total });
        } catch (e) {
            reject(e);
        }
    });
}

const checkoutCart = async(user) => {
    return new Promise(async(resolve, reject) => {
        try {
            await user.populate('cart.product').execPopulate();
            const cart = user.cart;
            const shipping_cost = 200;
            var cart_total = 0
            cart.forEach(async(item) => {
                var net_price = parseInt(item.product.Price) * parseInt(item.qty) ;
                item.net_price = net_price;
                cart_total += net_price;
            });
            var net_total = cart_total + shipping_cost ;

            // TODO: Empty 'cart' and after creating 'order'
            // NOTE: Shipping Address by default empty.
            user.orders = user.orders.concat({
                cart,
                shipping_cost,
                net_total,
            });
            console.log(cart_total+" checkOutCart Called") ;
            await user.save();
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}

const getOrder = async(user) => {
    return new Promise(async(resolve, reject) => {
        try {
            await user.populate('orders.cart.product').execPopulate();
            const orders = user.orders;
            var order_exists = true;
            var order = null,
                products = null;
            if (orders.length == 0) {
                order_exists = false;
                resolve({
                    order_exists,
                    products,
                    order
                });
            }
            order = orders[orders.length - 1];
            products = user.orders[orders.length - 1].cart;
            var cart_subtotal = 0
            products.forEach(async(product) => {
                var net_price = parseInt(product.product.Price) * parseInt(product.qty);
                product.net_price = net_price;
                cart_subtotal += net_price;
            });
            const cart_summary = await getCartSummary(order);
            //console.log(cart_subtotal+" getOrder Called") ;
            //console.log(cart_summary) ;
            
            resolve({
                order_exists,
                products,
                order,
                cart_subtotal,
                cart_summary
            });
        } catch (e) {
            reject(e);
        }
    });
}

const getCartSummary = async(order) => {
    return new Promise(async(resolve, reject) => {
        try {
            const cart = [...order.cart];
            resolve({
                coupon_applied: order.coupon_applied,
                shipping_cost: order.shipping_cost,
                cart_subtotal: (order.net_total-order.shipping_cost),
                cart_total: ( order.net_total),
                cart: cart
            });
        } catch (e) {
            reject(e);
        }
    });
}



module.exports = {
    addToCart,
    removeFromCart,
    getCart,
    checkoutCart,
    getOrder,
    getCartSummary,
}