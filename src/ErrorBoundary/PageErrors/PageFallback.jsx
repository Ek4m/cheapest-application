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
            </div>
        )
    }
       return (
       <div className='RegisterFallback'>
                <h1>No connection</h1>   
                <p>Please, check your connection</p>    
            </div>
       )    
}

export default RegisterFallback
