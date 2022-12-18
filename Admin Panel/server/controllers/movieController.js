

require('../models/db') ;
const Movie = require('../models/nonauthproducts') ;
const Artist = require('../models/artist') ;
const Product = require('../models/product') ;
const { MailtrapClient } = require("mailtrap");
const nodemailer = require('nodemailer');
const { json } = require('express');




exports.profile = async(req, res) => {
  
  try{
        let Id = req.params.id ;

        // nonauthproducts == Movie
        const movies = await Movie.findById(Id) ;
        
        //console.log(typeof movies.ArtistId);
        let product_list = await Artist.find({ ArtistId : movies.ArtistId });
        let product_count = product_list.length ;
  
        console.log("product_list "+ product_list) ;
        //console.log( movies.ArtistId + " movies.ArtistId " ) ;
        console.log( " product_list.ArtistId " + product_list.ArtistId ) ;

          if( product_count === 0 )
          {
              console.log("Not Found Working") ;
              res.render('profile',{alert:"Artist Id Not Found."}) ;
          }
          else
          {
            res.render('home',{alert:"Artist Id Found."});
            //res.render('home',{movies}) ;
          }
          

    }catch (err) {

        console.log(err) ;
        res.render('profile',{alert:"Artist Id Not Found. "}) ;

    } 
}
 

 /**
 * /api/movies/ 
 * GET All Movies
 */
 exports.listMovies = async(req, res) => {
  
   try {
     const movies = await Movie.find({}).lean() ;
     const counter = await Movie.find({}).countDocuments() ;
     let artist = await Artist.find({});
     //console.log(counter) ;
     //res.json({ page: page, limit:limitRecords, movies});
      res.render('home',{movies,counter,artist}) ;
    } catch (err) {
      console.log(err) ;
     res.status(400).json( {message: err })
   } 
 }
 
 
 /**
 * /api/movies/ 
 * POST Single Movie
 */
 exports.adduser = async(req, res) => {

    const paramID = req.params['id'] ;

    try {

      console.log(" Id is  " + paramID) ;
      const ptr = await Movie.findById(paramID) ;
      const user = await Artist.find({ArtistId:ptr.ArtistId}) ;
      var data = [] ;

        user.forEach((el)=>{
            const obj = {
                email  : el.email,
            }
            data.push(obj);
        });
      
      console.log("User Found " + user ) ;
      console.log("Data Collected " + data );
      console.log("User email Id " + data[0].email ) ;
      console.log(ptr) ;

      try {

        const insert = Product.insertMany( 
          [
            { 
              name : ptr.ProductName ,
              Image_URL : ptr.Image_URL ,
              Category : ptr.Category ,
              Price : ptr.Price ,
              Quantity : ptr.Quantity ,
              Vendor : ptr.ArtistName
          
          } ,

          ]
        
        );


        const str = await Movie.deleteOne({ _id:paramID });

        const transporter = nodemailer.createTransport({
          port: 465,               // true for 465, false for other ports
          host: "smtp.gmail.com",
             auth: {
                  user: 'apl.vishwajeet@gmail.com',
                  pass: 'xkwrotkpxnipowuf'
               },
          secure: true,
          });
        
        var mailOptions = {
          from: 'apl.vishwajeet@gmail.com',
          to: data[0].email ,
          subject: 'Email From Hastangan',
          text: " Hello " +  ptr.ArtistName + "\n " + "\nYour product has listed on Hastangan" + "\n\n\nThank you ." ,   
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        //res.redirect('/') ;

      }catch (e) {
        console.log(err) ;
        res.render('error',{error_code:600}) ;
  
      };
      
    res.redirect('/') ;
    
    } catch (err) {

      console.log(err) ;
      res.render('error',{error_code:700}) ;
      
    }
 }
 
 
 /**
 * /api/movies/:id
 * PATCH Single Movie
 */
 exports.updateSingleMovie = async(req, res) => {
   let paramID = req.params.id;
   let name = req.body.name;
 
   try {
     const updateMovie = await Movie.updateOne({ _id:paramID }, { name:name });
     res.json(updateMovie);
   } catch (error) {
     res.status(400).json( { message: err })
   }
 }
 
 
 /**
 * /api/movies/:id
 * DELETE Single Movie
 */
 exports.delete = async(req, res) => {

    let paramID = req.params.id ;
    console.log("Id is " + paramID) ;


    try {
      const ptr = await Movie.findById(paramID) ;
      const user = await Artist.find({ArtistId:ptr.ArtistId}) ;
      var data = [] ;

        user.forEach((el)=>{
            const obj = {
                email  : el.email,
            }
            data.push(obj);
        });

      const str = await Movie.deleteOne({ _id:paramID });

      const transporter = nodemailer.createTransport({
        port: 465,               // true for 465, false for other ports
        host: "smtp.gmail.com",
           auth: {
                user: 'apl.vishwajeet@gmail.com',
                pass: 'xkwrotkpxnipowuf'
             },
        secure: true,
        });
      
      var mailOptions = {
        from: 'apl.vishwajeet@gmail.com',
        to: data[0].email ,
        subject: 'Email From Hastangan',
        text: " Hello " +  ptr.ArtistName + "\n " + "\nSorry but your product cannot be listed on Hastangan.\nYour request is no longer under consideration , Please check the details again \n" + "\n\n\nThank you ." ,   
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.redirect('/') ;

    } catch (error) {

        console.log(error) ;
        //res.status(400).json( { message: error }) ;
        res.render('error',{error_code:700}) ;
    }

 }























// async function insertMovies(){
//     try {
//       await Movie.insertMany([
//         {
//           "name": "Casino Royale",
//           "description": "After earning 00 status and a licence to kill, secret agent James Bond sets out on his first mission as 007. Bond must defeat a private banker funding terrorists in a high-stakes game of poker at Casino Royale, Montenegro.",
//           "category": ["Action", "Adventure", "Thriller"],
//           "thumbnail": "casino-royale.jpg"
//         },
//         {
//           "name": "Titanic",
//           "description": "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
//           "category": ["Drama", "Romance"],
//           "thumbnail": "titanic.jpg"
//         },
//         {
//           "name": "Heat",
//           "description": "A group of high-end professional thieves start to feel the heat from the LAPD when they unknowingly leave a clue at their latest heist.",
//           "category": ["Crime", "Drama", "Thriller"],
//           "thumbnail": "heat.jpg"
//         },
//         {
//           "name": "Scream",
//           "description": "A year after the murder of her mother, a teenage girl is terrorized by a new killer, who targets the girl and her friends by using horror films as part of a deadly game.",
//           "category": ["Horror", "Mistery"],
//           "thumbnail": "scream.jpg"
//         },
//         {
//           "name": "The Matrix",
//           "description": "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
//           "category": ["Action", "Sci-Fi"],
//           "thumbnail": "the-matrix.jpg"
//         },
//         {
//           "name": "The Wolf of Wall Street ",
//           "description": "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.",
//           "category": ["Biography", "Crime", "Drama"],
//           "thumbnail": "the-wolf-of-wall-street.jpg"
//         },
//         {
//           "name": "The Shawshank Redemption",
//           "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
//           "category": ["Drama"],
//           "thumbnail": "the-shawshank-redemption.jpg"
//         },
//         {
//           "name": "Gladiator",
//           "description": "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
//           "category": ["Action", "Adventure", "Drama"],
//           "thumbnail": "gladiator.jpg"
//         },
//         {
//           "name": "The Godfather",
//           "description": "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
//           "category": ["Crime", "Drama"],
//           "thumbnail": "the-godfather.jpg"
//         },
//         {
//           "name": "The Dark Knight",
//           "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
//           "category": ["Action", "Crime", "Drama"],
//           "thumbnail": "the-dark-knight.jpg"
//         }
//       ]);
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
//   insertMovies(); 















