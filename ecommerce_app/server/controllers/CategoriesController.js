// const Categories = require('../models/CategoriesModel');
// const Products= require('../models/ProductsModel');

// class CategoriesController {
//     // GET FIND ALL
//     async findAll(req, res){
//         try{
//             const categories = await Categories.find({});
//             res.send(categories);
//         }
//         catch(e){
//             res.send({e})
//         }
//     }
//     // FIND ONE PRODUCT BY name
//     async findOne(req ,res){
//         let {product_name} = req.params;
//         try{
//             const product = await Products.findOne({name:product_name.split("_").join(" ")});
//             res.send(product);
//         }
//         catch(e){
//             res.send({e})
//         }

//     }
//     // POST ADD ONE
//     async insert (req, res) {
//         let { category } = req.body;
//         console.log(req)
//         try{
//             const done = await Categories.create({category:category});
//             res.send(done)
//         }
//         catch(e){
//             res.send(e)
//         }
//     }
//     // DELETE CATEGORY
//     async delete (req, res){
//         console.log('delete!!!')
//         let { category } = req.body;
//         try{
//             const removed = await Categories.deleteOne({ category });
//             res.send({removed});
//         }
//         catch(error){
//             res.send({error});
//         };
//     }
//     // UPDATE CATEGORY

//     async update (req, res){
//         let { category, newcategory } = req.body;
//         try{
//             const updated = await Categories.updateOne(
//                 { category },{ category:newcategory }
//              );
//             res.send({updated});
//         }
//         catch(error){
//             res.send({error});
//         };
//     }


//  };
// module.exports = new CategoriesController();