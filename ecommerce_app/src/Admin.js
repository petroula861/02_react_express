import React from 'react'
import Register from './Register.js'
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'

import Login from './Login.js'
import Navbar from './Navbar.js'
import Secretpage from './secretPage.js'

class Admin extends React.Component{

state=({secretpage:false})

 componentWillMount=()=>{
this.props.tabcolor("admin")
 }




render(){

return <div class="admincontainer">
<Router>
{!this.state.secretpage?<Navbar/>:null}
<div class="loginregister">
<Route exact path="/Admin/Register"  component={Register}/>
<Route exact path="/Admin/" component={Login}/> 
</div>
<Route exact path="/Admin/secretPage"  component={Secretpage} />
</Router>
</div>

}


}

export default Admin;