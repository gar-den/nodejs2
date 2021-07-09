const express = require('express');
const router = express.Router();  // making router
const crypto = require('crypto');
const authMiddleware = require('../middlewares/auth-middleware');

router.get('/', (req,res) => {
    res.render('index')
});

router.get('/detail', (req, res) => {
    let postId = req.query.postId;

    res.render('detail', {postId});
});

router.get('/makepost', (req, res) => {
    let postId = req.query.postId;

    res.render('makepost', {postId});
});

router.get('/submit', (req, res) => {
    let postId = req.query.postId;

    res.render('makepost', {postId});
});

router.get('/isValid', (req, res) => {
    let p1 = req.query.password1;
    let p2 = crypto.createHmac('sha256', req.query.password2).update('hashhashhash!').digest('hex');

    res.send({ result: "success", valid: p1 == p2 ? true : false })
});

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/chat', (req, res) => {
    res.render('chat');
})

module.exports = router;