import React from 'react'
import { Redirect } from 'react-router-dom'

const withAuth = (Component) => {
  return class extends React.Component {
      render(){
        console.log(this.props)

         if(this.props.user){
          return <Component {...this.props} />
         }else{
           console.log('redirect')
return <div></div>
         }           
          }          
      }
}

export default withAuth
