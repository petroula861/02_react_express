import React from 'react'
import Cartproducts from './Cartproducts.js'
import Cartcheckout from './Cartcheckout.js'
import Cartconfirmation from "./Cartconfirmation.js";
import './App.css';
import Navbarcart from './Navbarcart.js'
import {BrowserRouter as Router,Redirect,Button, Route} from 'react-router-dom'
import {NavLink} from "react-router-dom" 

class Cart extends React.Component{

    state={totalprice:0,cartstate:"cart",confstatus:""}

//this is for passing the total amount in cart
checkout=(totalprice)=>{
this.setState({totalprice:totalprice})
//this.setState({checkout:true})
}
componentDidMount(){
  this.setstagecart("cart")
  this.setState({totalprice:0})
  this.setState({confstatus:""})
}
//this is for redirecting changing state in cart
setstagecart=(stage)=>{
  this.setState({cartstate:stage})
}
//this is for getting the confirmation message: payment successfull or not..
getconfirmationstatus=(confstatus)=>{
  this.setState({confstatus:confstatus})
}

render(){

 
return <div>
        <Router>
          <div class="Navbarcart">
            <div className={this.state.cartstate==="cart"?"true":"false"}>Cart</div ><div className={this.state.cartstate==="checkout"?"true":"false"}>Checkout</div><div className={this.state.cartstate==="confirmation"?"true":"false"}>Confirmation</div>
          </div>
          {/* <NavLink exact to={"/Cartcheckout"}>checkout </NavLink> */}
          <Route exact path="/Cart" render={props=>(this.state.cartstate==="cart")?<Cartproducts cartproducts={this.props.cartproducts} getconfirmationstatus={this.getconfirmationstatus} setstagecart={this.setstagecart} checkout={this.checkout}/>:(this.state.cartstate==="checkout"?<Cartcheckout getconfirmationstatus={this.getconfirmationstatus} setstagecart={this.setstagecart}  totalprice={this.state.totalprice}/>:<Cartconfirmation setstagecart={this.setstagecart} confstatus={this.state.confstatus} revert={this.props.revert}/>)}/>
          {/* <Route exact path="/Cartcheckout" render={props=><Cartcheckout {...this.props}/>}/> */}
          </Router> 
      
         </div>

} 
}

export default Cart;