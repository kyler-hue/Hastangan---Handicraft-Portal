

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const hbs = require('hbs');
require('./utils/mongoose');



const authRouter = require('./routers/auth');
const indexRouter = require('./routers/index');
const productRouter = require('./routers/product');
const cartRouter = require('./routers/cart');
const userRouter = require('./routers/user');
const orderRouter = require('./routers/order');
const shippingRouter = require('./routers/shipping') ;
const searchingRouter = require('./routers/search') ;
const submitRouter = require('./routers/submit') ;
const addArtistRouter = require('./routers/addArtist') ;
const viewArtistRouter = require('./routers/view-artist') ;
const deleteArtist = require('./routers/deleteArtist') ;


const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
const session = require('express-session');

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000 ;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser('HastKalaSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());
// TODO: Implement CSRF accross website
// app.use(csurf());

// Defining paths
const PUBLIC_DIR_PATH = path.join(__dirname, '../public');
const VIEWS_PATH = path.join(__dirname, '../templates/views');
const PARTIALS_PATH = path.join(__dirname, '../templates/partials');

// Setting up Handlebars engines and paths
app.set('view engine', 'hbs');
app.set('views', VIEWS_PATH);
hbs.registerPartials(PARTIALS_PATH);

// Register custom Handlebars
require('./utils/register_hbs');

// Serving static files
app.use(express.static(PUBLIC_DIR_PATH));


// Registering routers
app.use(authRouter) ;
app.use(indexRouter) ;
app.use(productRouter) ;
app.use(cartRouter) ;
app.use(userRouter) ;
app.use(orderRouter) ;
app.use(shippingRouter) ;
app.use(searchingRouter) ;
app.use(addArtistRouter) ;
app.use(submitRouter) ;
app.use(viewArtistRouter) ;
app.use(deleteArtist) ;


app.get('*', (req, res) => {
    res.render('error', {
        error_code: 404,
    });
});

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
});