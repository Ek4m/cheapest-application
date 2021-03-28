import React from 'react';
import PageFallback from './PageFallback';
class RegisterBoundary extends React.Component {

    state = {
        hasError:false
    }

    static getDerivedStateFromError(error){
        return {
            hasError:true
        }
    }

    componentDidCatch(error, errorInfo){
    }


render(){
  if(this.state.hasError){
    return <PageFallback />
  }else{
    return this.props.children
  }
}
}

export default RegisterBoundary;