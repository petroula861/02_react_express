const Admin= require('../models/AdminModel');
const bcrypt     = require('bcrypt');
const jwt        = require('jsonwebtoken');
const saltRounds = 10;



class AdminController {

async insertAdmin(req,res){
    const {admin,password,password2}=req.body
    if( !admin || !password || !password2){res.json({ok:false,message:'All field are required'})};
    if(password!==password2){res.json({ok:false,message:'password should match'})}


    try{
        const exist = await Admin.findOne({admin })
        if(exist){res.json({ok:false,message:'email already in use'})}
        
            //you generate a hash from the password, and you store that
            //!!password has to be string
            const hash= await bcrypt.hash(password, saltRounds)
            console.log('hash',hash)

            const user= await Admin.create({admin:admin,password:hash})
            res.json({ok:true,message:'successful register',user})
      


    }
    catch(error){
        res.json({ok:false,error})


    }

}

async loginAdmin(req,res){
    const { admin , password } = req.body;
	if( !admin || !password ) return res.json({ok:false,message:'All fields are required'});

    try{
        const user= await Admin.findOne({admin})
        if(!user){res.json({ok:false,message:'email address doesnt exist'})}
        else{
        // Given the same password and a hash it’s possible to find out if the hash was built from that
        //password, using the bcrypt.compare()
        const  match =await bcrypt.compare(password,user.password)       
         if (match){ 

        //Generate a JWT token and return this token to the frontend
        //!!user.toJSON() converts to string
            const token = jwt.sign(user.toJSON(), 'secretkey' ,{ expiresIn:1080 })
           res.json({ok:true,message:'welcome back',token,admin}) }
        else{res.json({ok:false,message:'invalid password'})}
         }
    }
    catch(error){
         res.send(error)

    }
}

async verify_token(req,res){
    try{
        console.log(req.body.token)
        const { token } = req.body;

        //verify the users token
        jwt.verify(token, 'secretkey')
        res.json({ok:true,token:token})
 
    }
    catch(error){
        res.json({ok:false,message:'something went wrong'})

    }

}


}

module.exports = new AdminController();
