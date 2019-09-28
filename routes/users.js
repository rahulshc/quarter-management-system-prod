var express = require('express');
var router = express.Router();

var user_controller=require('../controllers/userController');
var auth=require('../middleware/auth');
var auth_admin=require('../middleware/auth_admin');


/* GET users listing. */
router.get('/signup', auth_admin, user_controller.signup_get);

router.post('/signup', auth_admin, user_controller.signup_post);

router.get('/login',  user_controller.login_get);

router.post('/login',  user_controller.login_post);

router.get('/logout', user_controller.logout_get);

router.post('/logout', user_controller.logout_post);

module.exports = router;
