import {Button } from 'semantic-ui-react';
import {NavLink} from "react-router-dom"
import React from 'react'

class Navbar extends React.Component{

render(){
 return <div class="navbaradmin">
          <NavLink exact to={"/Admin/Register"}>Register</NavLink>
          <NavLink exact to={"/Admin/"}>Login</NavLink>
        </div>




}
}

export default Navbar;