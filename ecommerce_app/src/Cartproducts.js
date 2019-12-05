import React from 'react'
import './App.css';
import Navbarcart from './Navbarcart.js'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import FlipMove from "react-flip-move"
import axios from 'axios'


class Cartproducts extends React.Component{

    state={cartproducts:[],total:0,ok:[],message:[]}

    //create initial arrays
componentDidMount(){

   var total=0
   var tmp=[]
  

   this.props.cartproducts.map((item,index)=>{
    tmp.push({_id:item._id,name:item.name,price:item.price,quantity:1,finalprice:item.price})
     total+=item.price
   } )

   this.setState({total:total})
   this.setState({cartproducts:tmp})
}


increaseCount=(e)=>{

    var updatedproducts=[]
    var total=0
  
    this.state.cartproducts.map((item,index)=>{

   
      if(e.target.className==index){
          updatedproducts.push({_id:item._id,name:item.name,price:item.price,quantity:(item.quantity+1),finalprice:item.price*(item.quantity+1)*100/100})
          total+=(item.price*(item.quantity+1))
      }
      else{
        updatedproducts.push({_id:item._id,name:item.name,price:item.price,quantity:item.quantity,finalprice:item.finalprice})
        total+=(item.finalprice)
      }
  
    })
     
    this.setState({cartproducts:updatedproducts})
    this.setState({total:total.toFixed(2)})
    this.checkstock()
  }
  
  
  decreaseCount=(e)=>{
  
    var updatedproducts=[]
    var total=0
  
    this.state.cartproducts.map((item,index)=>{
      if(e.target.className==index&&item.quantity>1){
          updatedproducts.push({_id:item._id,name:item.name,price:item.price,quantity:item.quantity-1,finalprice:item.price*(item.quantity-1)})
          total+=item.price*(item.quantity-1)
  
      }
      else{
        updatedproducts.push({_id:item._id,name:item.name,price:item.price,quantity:item.quantity,finalprice:item.finalprice})
        total+=item.finalprice
      }
  
   
      
    })
    
    this.setState({cartproducts:updatedproducts})
    this.setState({total:total.toFixed(2)})
    this.checkstock()

  
  }

  removeproduct=(e)=>{ 
    var {total}=this.state 
    var {cartproducts}=this.state
    total-=(cartproducts[e.target.previousElementSibling.value].price)*(cartproducts[e.target.previousElementSibling.value].quantity)
    
    cartproducts.splice(e.target.previousElementSibling.value,1)

    this.setState({total:total})
    this.setState({cartproducts:cartproducts })
  }

clearcart=()=>{
  console.log("props state",this.props,this.state)


   this.checkstock()
  var flag=true
  this.state.ok.map((item,index)=>{
    if(!item){
      flag=false 
    }
  })
  if(flag){
    //this is for   passing the total amount in Cart.js
  this.props.checkout(this.state.total)
  this.props.setstagecart("checkout")

  // this.setState({cartproducts:[],total:0})

  }
 
  

}

checkstock=()=>{
  var ok=[]
  var message=[]
  var {cartproducts}=this.state
  cartproducts.map((item,index)=>{
  
  axios.post('http://localhost:3001/cart',item)
  .then(res=>{
    ok.push(res.data.ok)
    message.push(res.data.message)
    this.setState({ok:ok})
  this.setState({message:message})
    })
  .catch(error=>console.log(error))
  })
 
  


}

render(){


return <div class="cartcontainer"> 
         <div style={{"fontSize":'22px','textAlign':'center'}}>Your Shopping Cart</div>
          <button class="paymentbutton" onClick={this.clearcart}>Pay {this.state.total} $</button>
          <ol><FlipMove>{this.state.cartproducts.map((item,index)=>
            <div class="list">
              <div class="firstrow">
                <li value={index}></li>
                <i class="fa fa-trash" style={{fontSize:'25px'}} onClick={this.removeproduct} ></i><span style={{marginLeft:'1vw'}}>{item.name}</span>
                <span style={{float:'right'}}>{(item.finalprice).toFixed(2)} $</span></div>
              <div class="secondrow"><button className={index} onClick={this.decreaseCount}>-</button><span>{item.quantity}</span><button className={index} onClick={this.increaseCount}>+</button>
                 <span class="cartlistmessage">{this.state.message[index]}</span> 
              </div>           
            </div>
            )}
          </FlipMove></ol>
              <div>
            
        </div>
        
      </div>
    
}

}

export default Cartproducts;