const express = require('express') ;
const exphbs = require('express-handlebars') ;
const cors = require('cors') ;


require('dotenv').config() ;

// Register custom Handlebars
require('./server/utils/register_hbs');


const app = express() ;
const port = process.env.PORT || 8000 ;

// templating engine
app.engine('hbs',exphbs.engine({extname:'.hbs'})) ;
app.set('view engine','hbs') ;


app.use(cors()) ;
app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;

const routes = require('./server/routes/movieRoutes.js') ;
app.use('/',routes) ;


app.listen(port,()=>console.log(`Listening on port : ${port}`)) ;
