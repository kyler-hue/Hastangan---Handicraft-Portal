const mongoose = require('mongoose');
const validator = require('validator');

console.log("Artist databse called");
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
        required: false,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Address");
            }
        },
        lowercase: true
    },
    phone: {
        type: String,
        length: 10,
    },
    ArtistId:{
        type: String ,
        require: true ,
        unique: true,
    },
    ArtistAadhar: {
        type: String ,
        require: true ,
        unique: true,
    },
    Address: {
        type: String ,
        require: true 
    },
    State: {
        type: String ,
        require: true ,
    },
    District: {
        type: String ,
        require: true 
    },
    Taluka: {
        type: String ,
        require: true 
    },
    Village: {
        type: String ,
        require: true 
    },
    Pincode: {
        type: String,
        require: true 
    },
    Image: {
        type: String,
        required:false,
    },

});

userSchema.index({ ArtistId : 'text', ArtistAadhar : 'text'  });
const Artist = mongoose.model('Artists', userSchema);

module.exports = Artist ;


