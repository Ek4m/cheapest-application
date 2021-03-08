import React from 'react'
import { Redirect } from 'react-router'

const withAuth = (Component) => {
  return class extends React.Component {
      render(){
          switch(this.props.user){
            case "":
                  return <Redirect to="/" />
            default :
            return <Component {...this.props} />
          }          
      }
  }
}

export default withAuth
