import React from 'react'
import { Redirect } from 'react-router-dom'

const withAuth = (Component) => {
  return class extends React.Component {
      render(){
         if(this.props.user){
          return <Component {...this.props} />
         }else{
return <Redirect />
         }           
          }          
      }
}

export default withAuth
