const express     = require('express'), 
    router        = express.Router(),
    controller    = require('../controllers/ProductsController');



//=====>   /products/add        POST            // add new product to DB
router.post('/add', controller.insert);

// remove product by product id from DB

router.delete('/delete/:product_id', controller.delete);

//=====>   /products/update     POST            // update product
router.post('/update', controller.update);

//=====>   /products            GET             // get all products
router.get('/', controller.findAll);

// get one product by id 
router.get('/product_id/:product_id', controller.findOneProd);




module.exports = router;




