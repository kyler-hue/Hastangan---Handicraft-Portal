const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

JSON_SECRET_TOKEN = "process.env.JSON_SECRET_TOKEN" ;

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

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() , _admin: user.admin.toString() }, JSON_SECRET_TOKEN);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login.');
    }
    return user;
}

userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    user.password = await bcrypt.hash(user.password, 8);
    next();
});

userSchema.pre('remove', async function(next) {
    const user = this;
    // Cascading
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;