const express = require('express') ;

const router = express.Router() ;
const movieController = require('../controllers/movieController') ;


/*
 * App router 
 */
//router.get('/',movieController.homepage) ;
router.get('/',movieController.listMovies) ;
router.get('/profile/:id',movieController.profile) ;
router.get('/delete/:id',movieController.delete) ;
router.get('/adduser/:id',movieController.adduser) ;

module.exports = router ;