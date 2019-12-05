import React, { Component } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
  StripeProvider,
  Elements
} from "react-stripe-elements";
import axios from "axios";

class CheckoutForm extends Component {
  state = {
    errorMessage: "",
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
    amount: this.props.totalprice
  };

  

  handleChange = ({ elementType, complete, error }) => {
    if (error) return this.setState({ errorMessage: error.code });
    return this.setState({ [elementType]: complete });
  };

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async e => {
    e.preventDefault();
    const { cardNumber, cardCvc, cardExpiry } = this.state;
    if (!cardNumber || !cardCvc || !cardExpiry) return alert("Please fill all the fields");
    const fullname = this.state.name + this.state.lastname;
    const { name, lastname, email, phone, pc, amount } = this.state;
    if (this.props.stripe) {
      const { token } = await this.props.stripe.createToken({ name:fullname, email });
      //console.log('token ====>',token)
      const response = await axios.post(`http://localhost:3001/payment/charge`, {
        token_id: token.id,
        amount,
        name,
        lastname,
        email,
        phone,
        pc
      });
      console.log('response ====>',response.data)
      if(response.data.status === "succeeded" ){
 //          alert("Payment successful")
              this.props.getconfirmationstatus("Payment is successful")
              const res = await axios.post(`http://localhost:3001/emails/confirmation`, {email:this.state.email,name:this.state.lastname})
              console.log("email confirmation response",res)
            }   
      else{  
          //alert("Payment error")
           this.props.getconfirmationstatus("The payment was not completed")
        }

    } else {
//      alert("Stripe.js hasn't loaded yet.")
      this.props.getconfirmationstatus("Due to a technical reason the payment was not completed")
    }
    this.props.setstagecart("confirmation")
  };

  render() {
    return (
      <form className="checkout" onSubmit={this.handleSubmit}>
        {/*************************** FIRST ROW ****************************/}
        <div className="split-form">
          <label>
            Name
            <input required name="name" type="text" placeholder="Jane" onChange={this.handleInputChange} />
          </label>
          <label>
            Lastname
            <input required name="lastname" type="text" placeholder="Doe" onChange={this.handleInputChange} />
          </label>
        </div>
        {/*************************** SECOND ROW ****************************/}
        <div className="split-form">
          <label>
            Email
            <input
              required
              name="email"
              type="email"
              placeholder="jane.doe@example.com"
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Phone number
            <input required name="phone" type="number" placeholder="+34 816463723" onChange={this.handleInputChange} />
          </label>
        </div>
        {/***************************** THIRD ROW *****************************/}
        <div className="split-form">
          <label class="thirdrow">
            Card number
            <CardNumberElement onChange={this.handleChange} />
          </label>
          <label>
            CVC
            <CardCVCElement onChange={this.handleChange} />
          </label>

        </div>
        {/*************************** FOURTH ROW ****************************/}
        <div className="split-form">
          <label>
            Expiration date
            <CardExpiryElement  onChange={this.handleChange} />
          </label>
          <label>
            Postal code
            <input
              name="pc"
              type="text"
              placeholder="94115"
              className="StripeElement"
              onChange={this.handleChangeInput}
            />
          </label>
        </div>
        <div className="error" role="alert">
          {this.state.errorMessage}
        </div>
        <button>Pay € {this.state.amount}</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
