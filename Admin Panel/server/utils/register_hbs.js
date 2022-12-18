const exphbs = require('express-handlebars') ;

const hbs = exphbs.create({

    helpers:{
        ifEquals : function(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        }
    }

}) ;


