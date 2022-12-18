const express = require('express');
const router = new express.Router();
const AuthController = require('../controllers/auth');
const User = require('../models/user');
const chalk = require('chalk');

router.get('/login', async(req, res) => {
    const isLoggedIn = await AuthController.isLoggedIn(req.cookies);
    if (isLoggedIn) {
        console.log('true');
        res.redirect('/profile');
    } else {
        login_error = false;
        not_authenticated = false;
        if (req.query.user_created === true) {
            user_registered = true;
        } else {
            user_registered = false;
        }
        res.render('login', {
            user_registered,
            login_error
        });
    }
});

router.post('/login', async(req, res) => {
    AuthController.login(req.body)
        .then((token) => {
            res.cookie('auth_token', token, { httpOnly: true });
            res.redirect('/');
        })
        .catch((e) => {
            login_error = true;
            user_registered = false
            res.render('login', {
                user_registered,
                login_error,
            });
        });
});


router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        user_exists = true;
        res.render('register', {
            user_exists
        });
    } else {
        AuthController.createUser(req.body)
            .then((resp) => {
                res.redirect('/login?user_created=true');
            })
            .catch((e) => {
                res.render('error', {
                    error_code: 500
                });
            });
    }
});

router.get('/logout', (req, res) => {
    AuthController.logout(req.cookies.auth_token)
        .then((resp) => {
            res.clearCookie('auth_token');
            res.redirect('/');
        })
        .catch((e) => {
            res.redirect('/');
        });
});

router.get('/status', async(req, res) => {
    try {
        var user_info = '';
        if (req.cookies.auth_token) {
            jwt = require('jsonwebtoken');
            const token = req.cookies.auth_token;
            const decoded_token = jwt.verify(token, "process.env.JSON_SECRET_TOKEN");
            const user = await User.findOne({ _id: decoded_token._id, 'tokens.token': token });
            user_info = user;
        }
        res.send({
            'Headers': req.headers,
            'cookies': req.cookies,
            user_info
        });
    } catch (e) {
        console.log(chalk.red(`ERROR: ${e}`));
        res.render('error', {
            error_code: 500
        });
    }
});

module.exports = router;