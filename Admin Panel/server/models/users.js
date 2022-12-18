const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Address");
            }
        },
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        length: 10,
    },
    admin: {
        type: Boolean ,
        default: false 
    } ,
    shipping: [{
        'shipping_info': {
            'first_name': {
                type: String,
            },
            'last_name': {
                type: String,
            },
            'email': {
                type: String,
                validate(value) {
                    if (!validator.isEmail(value)) {
                        throw new Error("Invalid Email Address");
                    }
                },
                lowercase: true
            },
            'address': {
                type: String,
            },
            'city': {
                type: String
            },
            'state': {
                type: String
            },
            'country': {
                type: String
            },
            'pin': {
                type: Number,
                length: 6
            },
            'contact': {
                type: Number,
                length: 10
            }
        }
    }],
    cart: [{
        'product': {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        'qty': {
            type: Number,
            default: 1
        }
    }],
    orders: [{
        'cart': [{
            'product': {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            'qty': {
                type: Number,
                default: 1
            }
        }],
        'shipping_cost': {
            type: Number
        },
        'coupon_applied': {
            type: Boolean,
            default: false
        },
        'coupon_code': {
            type: String,
            default: ''
        },
        'net_total': {
            type: Number
        },
        'shipping_address': {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            field: 'shipping'
        },
        'billing_address': {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            field: 'shipping'
        },
        'payment_type': {
            type: String,
            enum: ['ONLINE', 'COD'],
            default: 'ONLINE'
        },
        'payment_completed': {
            type: Boolean,
            default: false
        }
    }],
    tokens: [{
        'token': {
            type: String,
            unique: true,
            required: true,
        }
    }],

});



const User = mongoose.model('users', userSchema);

module.exports = User ;


