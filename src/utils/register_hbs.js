const hbs = require('hbs');

// Registering custom Handlebars
hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('getPrice', function(price, qty) {
    return (parseFloat(price) * parseInt(qty));
});

hbs.registerHelper("if", function(conditional, options) {
    if (conditional) {
        return options.fn(this);
    }
});

hbs.registerHelper("ifInverted", function(conditional, options) {
    if (!conditional) {
        return options.fn(this);
    }
});

hbs.registerHelper('ifCond', function(v1, v2, options) {
    console.log(v1+"    "+v2) ;
    if(v1 == v2) {
      return options.fn(this);
    }
    return options.inverse(this);
});

