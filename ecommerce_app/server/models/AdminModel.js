const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const adminSchema =new Schema ({
    admin:{type:String,required:true,unique:true},
    password:{required:true,type:String}

})

module.exports = mongoose.model('Admin',adminSchema)