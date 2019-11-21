import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm.js";
import pk_test from "./config.js";

class Cartcheckout extends Component {
componentDidMount(){
  this.props.setstagecart("checkout")

}
  render() {
    return <div className="checkoutcontainer">
      <StripeProvider apiKey={pk_test}>
        <div className="example">
          <Elements>
            <CheckoutForm setstagecart={this.props.setstagecart}  totalprice={this.props.totalprice} getconfirmationstatus={this.props.getconfirmationstatus}/>
          </Elements>
        </div>
      </StripeProvider>
    )</div>
  }
}

export default Cartcheckout;
