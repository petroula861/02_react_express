import React  from 'react'
import Axios from 'axios' 
import Secretpagechild from './secretPageChild'

class Secretpage extends React.Component{


    componentDidMount(){
//        this.props.removeNavbar()
        const token = JSON.parse(localStorage.getItem('token'))
        this.verify_token(token)
        console.log("props",this.props)
        if( token === null ){ this.props.history.push('/Admin/')}
    }

   


	 verify_token = async (token) => {
	 	try{
            const response = await Axios.post('http://localhost:3001/admin/verify_token',{token})
            return !response.data.ok
            ?             
            this.props.history.push('/Admin/')
            : null
            
	 	}
	 	catch(error){
	 		console.log(error)
	 	}
	 }
     
    
    render(){

        
	return <div >
	          {/* <button onClick={()=>{localStorage.removeItem('token');this.props.history.push('/')}}>logout</button> */}
              <Secretpagechild />
	       </div>
    }
}

export default Secretpage;


