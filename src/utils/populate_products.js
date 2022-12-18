const Product = require('../models/product');

const products = [
    
    {
        "name":"Hand-Painted Fishes Napkin Holder In Sheesham Wood",
        "Image_URL": "https://cdn.shopify.com/s/files/1/0030/9759/1872/products/46_1800x1800.png?v=1610968062",
        "Category": "Hand Painted",
        "Price": 5000,
        "Quantity": 1000,
        "Vendor": "gov"
    },
    {
        "name":"Hand-Painted bird  Wood",
        "Image_URL": "https://cdn.shopify.com/s/files/1/0030/9759/1872/products/EL-002-138_A_280x.jpg?v=1581072420",
        "Category": "Wooden painting",
        "Price": 5000,
        "Quantity": 1000,
        "Vendor": "gov"
    },
    {
        "name":"Hand-Painted Wooden spoon",
        "Image_URL": "https://cdn.shopify.com/s/files/1/0030/9759/1872/products/EL-002-146_A_280x.jpg?v=1581668139",
        "Category": "Wooden craft",
        "Price": 5000,
        "Quantity": 1000,
        "Vendor": "gov"
    },
    {
        "name":"Hand painted desert stash" ,
        "Image_URL": "https://cdn.shopify.com/s/files/1/0030/9759/1872/products/EL-005-686_A_280x.jpg?v=1581668079",
        "Category": "Wooden craft",
        "Price": 5000,
        "Quantity": 1000,
        "Vendor": "gov"
    },
    {
        "name":"'Simply Ethnic' Hand-Painted Round Shaped Bowls In Wood (Set Of 3)",
        "Image_URL": "https://cdn.shopify.com/s/files/1/0030/9759/1872/products/el-005-326_a_720x.jpg?v=1570516267",
        "Category": "Hand Painted",
        "Price": 5000,
        "Quantity": 1000,
        "Vendor": "gov"

    },
    {
        "name":"'Planting Moo' Handmade & Hand-painted Planter Pot In Terracotta (6 Inch)",
        "Image_URL": "https://cdn.shopify.com/s/files/1/0030/9759/1872/products/EL-021-098_A_1800x1800.jpg?v=1594980525",
        "Category": "Hand Painted",
        "Price": 5000,
        "Quantity": 1000,
        "Vendor": "gov"
    },
    {
        "name":"'Mud Blossom Pair' Handmade & Hand-painted Planter Pots In Terracotta (4 Inch, Set of 2)",
        "Image_URL": "https://cdn.shopify.com/s/files/1/0030/9759/1872/products/EL-021-108_A_1800x1800.jpg?v=1594980490",
        "Category": "Hand Painted",
        "Price": 5000,
        "Quantity": 1000,
        "Vendor": "gov"
    },
    {
        "name":"The Ganesha Drapes' Hand-Painted Decorative Toran In Chilbil Wood",
        "Image_URL": "https://cdn.shopify.com/s/files/1/0030/9759/1872/products/EL-015-082_A_1800x1800.jpg?v=1570515776",
        "Category": "Hand Painted",
        "Price": 5000,
        "Quantity": 1000,
        "Vendor": "gov"
    },

    {
        "name":"Enlightened Ganesha Hand Carved Wooden Sculpture Showpiece" ,
        "Image_URL": "https://cdn.shopify.com/s/files/1/0030/9759/1872/products/EL-025-081_A_1800x1800.jpg?v=1592558960",
        "Category": "Hand-Carved",
        "Price": 5000,
        "Quantity": 1000,
        "Vendor": "gov"
    },
    {
        "name":"'Golden Ganeshas' Handmade Brass Miniatures In Dhokra Art (Set Of 5)",
        "Image_URL": "https://cdn.shopify.com/s/files/1/0030/9759/1872/products/el-014-062_a_1800x1800.jpg?v=1570515894",
        "Category": "Studio Pottery",
        "Price": 5000,
        "Quantity": 1000,
        "Vendor": "gov"
    },
    {
        "name":"Hanging & Wall Planters",
        "Image_URL": "https://cdn.shopify.com/s/files/1/0030/9759/1872/products/el-021-051_a_1800x1800.jpg?v=1570515927",
        "Category": "Hand-Painted",
        "Price": 5000,
        "Quantity": 1000,
        "Vendor": "gov"
    },
    {
        "name":"Decorative Garden & Balcony Hanging Planter In Ceramic",
        "Image_URL": "https://cdn.shopify.com/s/files/1/0030/9759/1872/products/el-021-016_a_b93baf02-546f-4e6a-a7bc-c5c10d1b674f_1800x1800.jpg?v=1570516132",
        "Category": "Handcrafted",
        "Price": 5000,
        "Quantity": 1000,
        "Vendor": "gov"
    },
    {
        "name": 'Twelve Blends- Spice Box With 12 Containers & Spoon In Sheesham Wood',
        "Image_URL": "https://m.media-amazon.com/images/I/71y6UxN6gxL._SL1100_.jpg",
        "Category": "Wooden craft",
        "Price": 1890,
        "Quantity": 5920,
        "Vendor": "Spice Club",
    },
    {
        "name": 'Thirteen Blends- Spice Box With 12 Containers & Spoon In Sheesham Wood',
        "Image_URL": "https://m.media-amazon.com/images/I/71y6UxN6gxL._SL1100_.jpg",
        "Category": "Wooden craft",
        "Price": 1600,
        "Quantity": 2320,
        "Vendor": "Spice Club",
    },
    {
        "name": 'Fourteen Blends- Spice Box With 12 Containers & Spoon In Sheesham Wood',
        "Image_URL": "https://m.media-amazon.com/images/I/71y6UxN6gxL._SL1100_.jpg",
        "Category": "Wooden craft",
        "Price": 1302,
        "Quantity": 6360,
        "Vendor": "Spice Club",
    },

]



const populate_products = async () => {
    try {
        products.every(async (product_values) => {
            var product = Product(product_values);
            await product.save();
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }

}

populate_products();