// =============== require and run express in a single line
const app = require('express')()

// =============== add body parser ===============
//enables us sending data in the request body
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
//Access-Control-Allow-Origin Header
const cors = require('cors');

// =============== BODY PARSER SETTINGS =====================

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// =============== DATABASE CONNECTION =====================

async function connecting(){
    try{
await mongoose.connect('mongodb://127.0.0.1/ecommerce',{useUnifiedTopology:true,useNewUrlParser:true})
console.log('connected to the DB')
    }
    catch(error){
        console.log('error:your DB is not running')

    }
}
connecting()
mongoose.set('useCreateIndex',true)

//================ CORS ================================
app.use(cors());

// =============== ROUTES ==============================
const adminRoute = require('./routes/AdminRoute')
const productsRoute = require('./routes/ProductsRoute')
const cartRoute = require('./routes/CartRoute')
const payment = require('./routes/PaymentRoute')
const email= require ('./routes/EmailsRoute')
//const categoriesRoute = require('./routes/CategoriesRoute')

// =============== USE ROUTES ==============================

app.use('/admin',adminRoute)
app.use('/products', productsRoute);
app.use('/cart', cartRoute);
app.use('/payment',payment)
app.use('/emails', email)
//app.use('/categories', categoriesRoute);

// =============== START SERVER =====================

app.listen(3001,()=>console.log('listening on port 3001'))