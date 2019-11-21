const express=require('express'),
router=express.Router(),
controller=require('../controllers/AdminController')

router.post('/register',controller.insertAdmin)

router.post('/login',controller.loginAdmin)

router.post('/verify_token',controller.verify_token);

module.exports =router;