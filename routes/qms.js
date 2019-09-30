var express = require('express');

var router = express.Router();

var quarter_controller=require('../controllers/quarterController');
var resident_controller=require('../controllers/residentController');
var contactlist_controller=require('../controllers/contactlistController');
var admin_controller=require('../controllers/adminController');
var auth=require('../middleware/auth');
var auth_admin=require('../middleware/auth_admin');

//home page dashboard route
router.get('/', quarter_controller.index);

router.get('/quarter/create', auth, quarter_controller.quarter_create_get);

router.post('/quarter/create', auth, quarter_controller.quarter_create_post);

router.get('/quarter/:id/edit', auth, quarter_controller.quarter_edit_get);

router.post('/quarter/:id/edit', auth, quarter_controller.quarter_edit_post);

router.get('/quarters', auth, quarter_controller.quarter_list_get);

router.post('/quarters', auth, quarter_controller.quarter_list_post);

router.get('/quarter/:id', auth, quarter_controller.quarter_detail);


router.get('/residents', auth, resident_controller.resident_list_get);

router.post('/residents', auth, resident_controller.resident_list_post);

router.get('/resident/:id', auth, resident_controller.resident_detail);

//router.get('/resident/:id/edit', resident_controller.resident_edit_get);

//router.get('/resident/:id/edit', resident_controller.resident_edit_post);

router.get('/contactlist', auth, contactlist_controller.contactlist_list);

router.get('/transferalert', auth, quarter_controller.transfer_alert);

router.get('/retirementalert', auth, quarter_controller.retirement_alert);

router.get('/waitlist', auth, quarter_controller.waitlist_get);

router.post('/waitlist', auth, quarter_controller.waitlist_get);

router.get('/exportdata', auth, quarter_controller.export_data);

router.get('/adminportal', auth_admin, admin_controller.test_get);

router.post('/adminportal', auth_admin, admin_controller.test_post);

/*router.get('*', function (req, res) { 
    res.render('404error'); 
}) */

module.exports=router;