const express     = require('express'), 
    router        = express.Router(),
    controller    = require('../controllers/CartController');



//=====>   /       POST  // get items from cart
router.post('/', controller.find);



module.exports = router;




