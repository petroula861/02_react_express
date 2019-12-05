import React from 'react';
import './App.css';
import Register from './Register.js'
import Admin from './Admin.js'
import Cart from './Cart.js'
import Secretpage from './secretPage.js'
import Catalog from './Catalog.js'
import Navbar from './Navbar.js'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {NavLink, Link} from "react-router-dom"
import Axios from 'axios'
import {Button } from 'semantic-ui-react';



class App extends React.Component{

  state={products:[],cartproducts:[],initialpage:true,counter:0,tab:"true"}

  componentWillMount=()=>{
    // this.getProducts()

  }

tabcolor=(tab)=>{
  if(tab==="catalog"){
 this.setState({tab:true})}
 else{
  this.setState({tab:false})
 }
}
revertinitialpage=()=>{
    this.setState({initialpage:true})
    this.setState({counter:0})
}
revert=()=>{
  this.setState({initialpage:false})
}

getProducts= async ()=>{
    try{
        const res = await Axios.get('http://localhost:3001/products/')
           console.log(res.data.products)
            this.setState({products:res.data.products})

    }
    catch(error){
        console.log(error)
    }
   
}

addToCart=(e)=>{ 

  var flag=false
  let {cartproducts,counter,products}=this.state
  cartproducts.map((item,index)=>{

    if(item._id===products[e.target.className]._id){
      flag=true
     
    }

  })

  if(flag===false){
    this.setState({cartproducts:cartproducts.concat(this.state.products[e.target.className])})
    counter++}
  
  this.setState({counter:counter})

}

secretpage=(status)=>{
//doesnt do anything,printed because it is called in SecretPage.js in componentDidMount
}



  render(){
  return<div className="App">
          <Router>
          <div className="upperpart">
            <h4>Petras e-shop</h4>
            <div className="carticon"><div><Link exact to={"/Cart"}><img src="https://img.icons8.com/material-rounded/24/000000/shopping-cart.png"/></Link>{this.state.counter}</div></div>
          </div>
          <div class="navbarApp">
           <Link  class={String(this.state.tab)}  exact to={"/"}>Catalog</Link>
           <Link  class={String(!this.state.tab)}  exact to={"/Admin"}>Admin Page</Link>
          </div>
          <Route exact path="/Admin/secretPage"  render={props=><Secretpage {...props} secretpage={this.secretpage}/>}  />

           <Route exact path="/" render={()=>(<Catalog tabcolor={this.tabcolor} products={this.state.products} addToCart={this.addToCart} revertinitialpage={this.revertinitialpage} getProducts={this.getProducts}/>)}></Route>
           <Route exact path="/Admin/" render={()=>(this.state.initialpage?<Admin  revert={this.revert} tabcolor={this.tabcolor}/>:<Redirect to="/"/>)}></Route>
           <Route exact path="/Cart" render={()=>(this.state.initialpage?<Cart revert={this.revert} cartproducts={this.state.cartproducts}/>:<Redirect to="/"/>)}/>
           
          </Router>         
         </div>
  }
}

export default App;
