import React from 'react'
import axios from 'axios'


class Register extends React.Component{

  state={admin:"",password:"",password2:"",success:"",message:""}

  registerAdmin=async userdata =>{
    let url='http://localhost:3001/admin/register'

    axios.post(url,userdata)
    .then(res=>{
      this.setState({message:res.data.message})
      console.log(res)})
    .catch(error=>console.log(error))



  }

  getEmail=(e)=>{
    this.setState({admin:e.target.value})
  }

  getPassword=(e)=>{
    this.setState({password:e.target.value})

  }
  getPassword2=(e)=>{
    this.setState({password2:e.target.value})
    
  }
  
  handleSubmit= (e)=>{
   e.preventDefault()
   this.registerAdmin(this.state)

  }

render(){

return   <form class="register" onSubmit={this.handleSubmit}>
           <label>email</label>
           {}<input placeholder="email" onChange={this.getEmail}></input><br/>
           <label>password</label>
           <input placeholder="password" onChange={this.getPassword}></input>
           <label>confirm password</label>
           <input placeholder="password" onChange={this.getPassword2}></input>
           <button>Register!</button>
           <div className='message'><h4>{this.state.message}</h4></div>
         </form>

}

}

export default Register;