import React from 'react'
import Axios from 'axios' 



class Secretpagechild extends React.Component{

    
    state={products:[],displayproducts:false,displayoneproduct:false,oneproduct:{},resultoneproduct:{},addedproduct:false,newProductName:"",newProductCategory:"",newProductPrice:"",newProductImage:"",NewProductMessage:"",NewProductDescription:"",NewProductQuantity:"",deleteProduct:false,updateProduct:false,updateProductmessage:""}
  
    refresh=()=>{
        this.setState({displayproducts:false})
        this.setState({displayoneproduct:false})
        this.setState({addedproduct:false})
        this.setState({resultoneproduct:""})
        this.setState({deleteProduct:false})
        this.setState({updateProduct:false})
   
    }

//--------------drop down list--------------------
    handleOptions=(e)=>{
        this.refresh()
       if(e.target.value==="Display All Products"){
        this.getProducts()
       }
       if(e.target.value==="Find one Product"){
        this.searchOneproduct()
       }
       if(e.target.value==="Add Product"){
        this.addproduct()
       }
       if(e.target.value==="Delete Product"){
        this.deleteproduct()
       }
       if(e.target.value==="Update Product"){
        this.updateproduct()
       }
    }


//--------------- Get One product
    searchOneproduct= ()=>{
   // this.setState({displayproducts:false})
    this.setState({displayoneproduct:true})
    }
    
    setProduct=(e)=>{
        this.setState({oneproduct:e.target.value})
    }

    getProductbyid = async (e)=>{
        e.preventDefault()
        const {oneproduct}=this.state
        try{
            const res= await Axios.get(`http://${process.env.REACT_APP_API_HOST}:3001/products/product_id/`+oneproduct)
            this.setState({resultoneproduct:res.data})           
        }
        catch(e){
         console.log(e)
        }      
    }


// --------Get all products--------------
    getProducts= async ()=>{
        try{
            const res = await Axios.get(`http://${process.env.REACT_APP_API_HOST}:3001/products/`)
               console.log(res.data.products)
                this.setState({products:res.data.products})
                 this.setState({displayproducts:true})

        }
        catch(error){
            console.log(error)
        }

    }


//----------Add product -------------------------
addproduct= ()=>{
    this.setState({addedproduct:true})
}

setNewProductName=(e)=>{
this.setState({newProductName:e.target.value})
}
setNewProductCategory=(e)=>{
this.setState({newProductCategory:e.target.value})
}
setNewProductprice=(e)=>{
this.setState({newProductPrice:e.target.value})
}
setNewProductimage=(e)=>{
this.setState({newProductImage:e.target.value})
}
setNewProductdescription=(e)=>{
this.setState({newProductDescription:e.target.value})
}
setNewProductquantity=(e)=>{
this.setState({newProductQuantity:e.target.value})
}

//----------------------add product------------
addNewProduct = async (e)=>{
    e.preventDefault()
    const newproduct={category:this.state.newProductCategory,name:this.state.newProductName,price:this.state.newProductPrice,image:this.state.newProductImage,description:this.state.newProductDescription,quantity:this.state.newProductQuantity}
    try{
     const res= await Axios.post(`http://${process.env.REACT_APP_API_HOST}:3001/products/add`,newproduct)
     console.log(res)
         this.setState({NewProductMessage:res.data.message})
    
    }
    catch(e){
        console.log(e)

    }
}

//----------Delete a product by product id----------
deleteproduct=()=>{
 this.setState({deleteProduct:true})
}
deleteProductbyid= async (e)=>{
    e.preventDefault()
    const {oneproduct}=this.state
    try{
        const res= await Axios.delete(`http://${process.env.REACT_APP_API_HOST}:3001/products/delete/`+oneproduct)
        this.setState({resultoneproduct:res.data})           
    }
    catch(e){
     console.log(e)
    }   
}

//-------------------update product-----------
updateproduct=()=>{
    this.setState({updateProduct:true})
}

updateProductbyid=async (e)=>{
    e.preventDefault()
    const {oneproduct}=this.state
    try{
        const res= await Axios.get(`http://${process.env.REACT_APP_API_HOST}:3001/products/product_id/`+oneproduct)
        this.setState({resultoneproduct:res.data})           
    }
    catch(e){
     console.log(e)
    }

    if(this.state.resultoneproduct.ok){


          const {name,category,price,image,description,quantity}=this.state.resultoneproduct.products
          const product={name:name,category:category,price:price,image:image,description:description,quantity:quantity,newname:this.state.newProductName,newcategory:this.state.newProductCategory,newprice:this.state.newProductPrice,newimage:this.state.newProductImage,newdescription:this.state.newProductDescription,newquantity:this.state.newProductQuantity}
           console.log("product",product)
          const res2= await Axios.post(`http://${process.env.REACT_APP_API_HOST}:3001/products/update/`,product)
          this.setState({updateProductmessage:res2.data.message})
    }
    else{
        this.setState({updateProductmessage:this.state.resultoneproduct.message})
    }

}

render(){


return <div class="productslist">
    <select onChange={this.handleOptions} name="list">
<option value="Select Action" selected >Select Action</option>
<option value="Display All Products" >Display All Products</option>
<option value="Find one Product" >Find one Product</option>
<option value="Add Product" >Add one Product</option>
<option value="Delete Product" >Delete one Product</option>
<option value="Update Product" >Update one Product</option>
    </select>
   <div>{this.state.displayproducts? <ul>
                                     {this.state.products.map((item,index)=>
                                        <li key={index}><strong>category: </strong>{item.category}<br/><strong>name: </strong>{item.name}<br/><strong>image: </strong>{item.image}<br/><strong>price: </strong>{item.price}<br/><strong>product id: </strong>{item._id}<br/></li>
                                      )}</ul>:null}
    </div>
    <div>
     {this.state.displayoneproduct?<form onSubmit={this.getProductbyid}>
                                      <label>product ID</label>
                                        <input onChange={this.setProduct}></input>
                                      <button >search!</button>
                                      {this.state.resultoneproduct.ok?<div><div>{this.state.resultoneproduct.products.category}</div><div>{this.state.resultoneproduct.products.name}</div><div>{this.state.resultoneproduct.products.image}</div><div>{this.state.resultoneproduct.products.description}</div><div>{this.state.resultoneproduct.products.quantity}</div><div>{this.state.resultoneproduct.products.price}</div></div>:<div>{this.state.resultoneproduct.message}</div>}
                                    </form>:null}   
    </div>
    <div>
        {this.state.addedproduct?<form onSubmit={this.addNewProduct}>
                                    <label>product Name</label>
                                      <input required onChange={this.setNewProductName}></input>
                                      <label>Category</label>
                                      <input onChange={this.setNewProductCategory}></input>
                                      <label>price</label>
                                      <input onChange={this.setNewProductprice}></input>
                                      <label>description</label>
                                      <input onChange={this.setNewProductdescription}></input>
                                      <label>quantity</label>
                                      <input onChange={this.setNewProductquantity}></input>
                                      <label>image</label>
                                      <input placeholder="paste a URL" onChange={this.setNewProductimage}></input>
                                      <button >Submit!</button>
                                      <div>{this.state.NewProductMessage}</div>
        </form>
        :null}
    </div>
    <div>{this.state.deleteProduct?<form onSubmit={this.deleteProductbyid}>
                                      <label>product ID</label>
                                      <input onChange={this.setProduct}></input>
                                      <button >search!</button>
                                      <div>{this.state.resultoneproduct.message}</div>
                                    </form>:null}

    </div>
    <div>{this.state.updateProduct?<form onSubmit={this.updateProductbyid}>
                                    <label>product Id of the product you want to update</label>
                                      <input onChange={this.setProduct}></input>
                                      <label>Make changes to the product:</label>
                                      <label>Name</label>
                                      <input onChange={this.setNewProductName}></input>
                                      <label>Category</label>
                                      <input onChange={this.setNewProductCategory}></input>
                                      <label>price</label>
                                      <input onChange={this.setNewProductprice}></input>
                                      <label>description</label>
                                      <input onChange={this.setNewProductdescription}></input>
                                      <label>quantity</label>
                                      <input onChange={this.setNewProductquantity}></input>
                                      <label>image</label>
                                      <input placeholder="paste a URL" onChange={this.setNewProductimage}></input>
                                      <button >Submit!</button>
                                      <div>{this.state.updateProductmessage}</div>
        </form>:null}

    </div>


</div>

}

}

export default Secretpagechild;