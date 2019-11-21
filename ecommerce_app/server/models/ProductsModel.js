const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productsSchema = new Schema({
    category:String,
    name:{type:String,unique:true,required:true},
    price:Number,
    image:String,
    description:String,
    quantity:{type:Number,required:true}
})
module.exports =  mongoose.model('products', productsSchema);

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const productsSchema = new Schema({
//     categoryID:{type:mongoose.Types.ObjectId, ref:'category'},
//     name:{type:String,unique:true,required:true},
//     price:Number,
//     image:String
// })
// module.exports =  mongoose.model('products', productsSchema);
