const Products = require('../models/ProductsModel');

 
class CartController {
    // Add to cart

    
    async find (req, res) {
        const {_id,quantity}=req.body
  
        try{ 
            const product = await Products.findOne({_id:_id})

            if(product.quantity>=quantity){
                res.json({ok:true,message:""})
            }
            else{

            res.json({ok:false,message:"Only "+product.quantity+ "left in Stock"})
            }
        }
        catch(e){
            res.json({error:e,body:req.body})
        }
    }
 

 };
module.exports = new CartController();