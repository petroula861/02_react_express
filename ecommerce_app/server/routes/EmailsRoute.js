const router     = require('express').Router();
const controller = require('../controllers/EmailsController.js')

router.post('/confirmation',controller.send_email)

module.exports = router
