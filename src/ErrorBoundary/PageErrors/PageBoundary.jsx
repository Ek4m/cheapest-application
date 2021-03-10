import React from 'react';
import PageFallback from './PageFallback';
class RegisterBoundary extends React.Component {

    state = {
        hasError:false
    }

    static getDerivedStateFromError(error){
        console.log('Derived state from props');
        console.log(Object.entries(error))
        console.log(error.message);
        console.log(typeof error);
        return {
            hasError:true
        }
    }

    componentDidCatch(error, errorInfo){
             console.log('cdcdam salamlar')
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