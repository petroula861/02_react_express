import React from 'react';
import './App.css';
import Register from './Register.js'
import Admin from './Admin.js'
import Cart from './Cart.js'

import Login from './Login.js'
import Navbar from './Navbar.js'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {NavLink, Link} from "react-router-dom"
import Axios from 'axios'
import {Button } from 'semantic-ui-react';



class Catalog extends React.Component{
 componentDidMount(){
   this.props.revertinitialpage()
   this.props.tabcolor("catalog")
   this.props.getProducts()
 }

  render(){
  return  <div className="containercatalog" style={{marginTop:"0%"}}>
          <div class="all"> 
             {this.props.products.map((item,index)=>
             <div class="productcontainer">       
               <div class="product">
                <strong class="name">{item.name}<br/><div class="productprice">${item.price}</div></strong>
                <img class="imgproduct" src={item.image}></img><br/>
                <strong>description:</strong>
                <span class="description">{item.description}</span><br/>
                <strong>cat:</strong>
                <span class="category">{item.category}</span><br/>              
               </div>
               <button class="buttonproduct" onClick={this.props.addToCart} className={index}><img src="https://img.icons8.com/material-rounded/24/000000/shopping-cart.png"/> Add to cart</button>                                 
             </div>)}
          </div> 
          </div>
      
  }
}

export default Catalog;
