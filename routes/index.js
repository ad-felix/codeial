const express = require('express');
const router =  express.Router();
const homeController = require('../controllers/home_controller');

console.log('Router Loaded');

router.get('/',homeController.home);
router.use('/users', require('./users')); //Linking the root controller to the sub-controllers
router.use('/users', require('./posts'));

//for any further routes, access from here
// reouter.use('/routerName', require('./routerFile'));

module.exports = router;