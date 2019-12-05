import React from 'react'
import axios from 'axios'

class Login extends React.Component{

state={admin:"",password:"",ok:"false", message:""}

componentDidMount(){
  console.log("running login page")
 
  const token = JSON.parse(localStorage.getItem('token'))
  
  if(token!==null){ this.props.history.push('/Admin/secretPage')}
  
}

getEmail=e=>{
    this.setState({admin:e.target.value})
}

getPassword=(e)=>{
    this.setState({password:e.target.value})
}

handleSubmit=(e)=>{
    e.preventDefault()
    var {admin,password}=this.state
    this.loginAdmin({admin:admin,password:password})
   
  }

loginAdmin= async userdata=>{
    let url='http://localhost:3001/admin/login'

    axios.post(url,userdata)
    .then(res=>{
      this.setState({ok:res.data.ok})
      this.setState({message:res.data.message})
      if( res.data.ok ){
        localStorage.setItem('token',JSON.stringify(res.data.token)) 
        //Since our Login component is rendered using a Route, it adds the router props to it. So we can redirect using the this.props.history.push method.
        setTimeout( ()=>  this.props.history.push('/Admin/secretPage') ,2000)   } 
    })

    .catch(error=>console.log(error))
} 

render(){

return <form class="login" onSubmit={this.handleSubmit}>
           <label>email address
              <input onChange={this.getEmail} placeholder="email"></input>
           </label>
           <label>password</label>
              <input onChange={this.getPassword} placeholder="password"></input>
           <button>Login!</button>
           <div>{this.state.message}</div>
        </form>


}

}

export default Login;