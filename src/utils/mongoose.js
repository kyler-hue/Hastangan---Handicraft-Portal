const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://<username>:<password>@cluster0.hhpe8pr.mongodb.net/HastDb?retryWrites=true&w=majority",

            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: true,
                useCreateIndex: true
            }
        )
        .then(() => console.log("DB Connection Successfull!"))
        .catch((err) => {

            console.log(err);

        });


// require('./populate_products'); 
