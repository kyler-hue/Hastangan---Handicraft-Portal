const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    Image_URL: {
        type:String,
        required:false,
        default:"https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
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
    Vendor: {
        type: String,
        trim: true
    },
    info: {
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

productSchema.index({ name: 'text', Category: 'text' });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

