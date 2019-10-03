const express = require('express');
const router =  express.Router();
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

// to create comments
router.post('/create',passport.checkAuthentication ,commentsController.create);

// to delete comments
router.get('/destroy/:id',passport.checkAuthentication ,commentsController.destroy);

module.exports = router;