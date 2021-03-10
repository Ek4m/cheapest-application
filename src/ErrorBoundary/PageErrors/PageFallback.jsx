import React, { useEffect } from 'react'
import './PageFallback.css'
const RegisterFallback = () => {


    useEffect(() => {
        document.title = 'Error!';
    },[])
    if(window.navigator.onLine){
        return (
            <div className='RegisterFallback'>
                <h1>Oops, something went wrong!</h1>   
                <p>Please, check your connection or reload the page</p>        
                <img src={require("../../images/error-image.png")} alt="error"/> 
            </div>
        )
    }else{
        console.log('internet sikdirib')
       return (
       <div className='RegisterFallback'>
                <h1>Oops, something went wrong!</h1>   
                <p>Please, check your connection</p>    
                <img src={require("../../images/no-network.png")} alt="no connection"/> 

            </div>
       )
    }

    
}

export default RegisterFallback
