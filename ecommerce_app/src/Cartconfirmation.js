import React, { Component } from "react";

class Cartconfirmation extends Component {

    state={message:""}


componentDidMount(){
  var counter=3
  this.props.setstagecart("confirmation")
  this.setState({message:this.props.confstatus})
  var timer=setInterval(()=>{
    this.setState({counter:counter})
    counter--  
    if(counter===-1){
    
      clearInterval(timer)
      this.props.revert()
    }
  },2000)
  
  

}
  render() {
    return <div className="confirmationcontainer">
        <div>{this.state.message}</div>
        <div className={this.state.message}>You will be redirected to the initial page in {this.state.counter}</div>
        
 
    </div>
  }
}

export default Cartconfirmation;
