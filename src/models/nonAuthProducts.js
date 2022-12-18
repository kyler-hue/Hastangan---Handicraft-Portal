const mongoose = require('mongoose');

const NonAuthProductSchema = new mongoose.Schema({

    ProductName: {
        type: String,
        required: true,
        trim: true
    },
    Image_URL: {
        type:String,
        required:false,
        default:"https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
    },
    Image: {
        type: String,
        required:false,
    },
    Category: {
        type : String ,
        required:true ,
    },
    Price: {
        type: String,
        required: true
    },
    Quantity: {
        type: String,
        default: 100
    },
    ArtistName: {
        type: String,
        trim: true ,
        required:true
    },
    ArtistId: {
        type: String,
        trim: true ,
        required:true
    },
    AadharId: {
        type: String,
        trim: true ,
        required:true
    },
    Info: {
        material: {
            type: String,
            default: 'Sheesham Wood'
        },
        dimensions: {
            type: String,
            default: 'SPICE BOX: (L * W * H) = (9.9 * 7.7 * 2.1), CONTAINERS: (L * W * H) = (2.2 * 2.2 * 1.1), SPOON: (L * W ) = (5.5 * 0.9) Inch'
        },
        art_type: {
            type: String,
            default: 'The Spice Box is Handcrafted in Sheesham Wood and Polished with Food Safe Lacquer'
        },
        capacity: {
            type: String,
            default: 'Each Container: 45 ML'
        }
    },
    // Comments, Rating and images
});

NonAuthProductSchema.index({ ProductName: 'text', Category: 'text' });

const NonAuthProduct = mongoose.model('NonAuthProduct', NonAuthProductSchema);
module.exports = NonAuthProduct ;




