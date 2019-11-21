const Products = require('../models/ProductsModel');
//const mongoose = require('mongoose');
 
class ProductsController {
    // GET FIND ALL
    async findAll(req, res){
        try{
            const products = await Products.find({});
            if(products){
              res.json({ok:true,message:"products found",products:products});
            }
            else{
                res.json({ok:false,message:"no products found"});

            }
        }
        catch(e){
            res.send({e})
            
        }
    }
    // GET PRODUCT BY PRODUCT ID
    async findOneProd(req ,res){
        let {product_id} = req.params;
        try{
            const products = await Products.findOne({_id:product_id});
            if(products){
                res.json({ok:true,message:"product found",products:products});
              }
              else{
                  res.json({ok:false,message:"Productid was not found"});
  
              }
        }
        catch(err){
            if (err.name==="CastError"){
                res.json({ok:false,message:"Productid was not found"});
            }
            else{res.send({err})}
        }

    }
    
    // POST ADD ONE
    async insert (req, res) {
        let { name } = req.body;
        let { category } = req.body;
        let { price } = req.body;
        let { image } = req.body;
        let { description } = req.body;
        let { quantity } = req.body;
        console.log(req)
        try{
            const exists = await Products.findOne({name:name})
            if(exists){
                res.json({ok:false,message:"The product name already exist"})
            }
            else{
            const done = await Products.create({category:category,name:name,price:price,image:image,description:description,quantity:quantity});
            res.json({ok:true,message:"successfuly added product",products:done})
            }
        }
        catch(e){
            res.send(e)
        }
    }
    // DELETE PRODUCT
    async delete (req, res){
        console.log('delete!!!')
        let {product_id} = req.params;
        try{
            const products = await Products.findOne({_id:product_id});
            if(products){
            const removed = await Products.deleteOne({_id:product_id});
            res.json({ok:true,message:"The product was deleted",removed:removed});
            }
            else{
                res.json({ok:false,message:"This productid doesnt exist"})
            }
        
        }
        catch(err){
            if (err.name==="CastError"){
                res.json({ok:false,message:"This productid doesnt exist"});
            }
            else{res.send({err})}
        };
    }
    // UPDATE PRODUCT
    // example request json
    //  {name:"",category:"",price:"",image:"",newname:"",newprice:..,newimage:"",newcategory:""}

    async update (req, res){
        let { name,price,image, category,description,quantity,newname, newprice, newimage, newcategory,newdescription,newquantity} = req.body;
        if(!newprice){newprice=price}
        if(!newname){newname=name}
        if(!newimage){newimage=image}
        if(!newcategory){newcategory=category}
        if(!newdescription){newdescription=description}
        if(!newquantity){newquantity=quantity}
        try{
            
            const updated = await Products.updateOne(
                { name },{ name:newname,category:newcategory,price:newprice,image:newimage,description:newdescription,quantity:newquantity}
             );
            res.json({ok:true,message:"product was updated",products:updated});
        }
        catch(error){
            res.send({error});
        };
    }


 };
module.exports = new ProductsController();