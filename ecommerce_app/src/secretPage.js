import React  from 'react'
import Axios from 'axios' 
import Secretpagechild from './secretPageChild'

class Secretpage extends React.Component{

 
    componentDidMount(){
        console.log("running secret page")
        
  
     this.props.secretpage(true)
    
        const token = JSON.parse(localStorage.getItem('token'))
        
        if( token === null ){ this.props.history.push('/Admin/')}
        this.verify_token(token)
    }

   


	 verify_token = async (token) => {
	 	try{
            const response = await Axios.post('http://localhost:3001/admin/verify_token',{token})
            console.log("verify_token respone",response)
            return !response.data.ok
            ?
            //what should happen when token expires?             
            // this.props.history.push('/Admin/')
            console.log(response.data)
            : null
            
	 	}
	 	catch(error){
	 		console.log(error)
	 	}
	 }
     
    
    render(){

        
	return <div class="secretpage">
	          {/* <button onClick={()=>{localStorage.removeItem('token');this.props.history.push('/')}}>logout</button> */}
              <Secretpagechild />
	       </div>
    }
}

export default Secretpage;


