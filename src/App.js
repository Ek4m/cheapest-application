import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import * as userActions from './redux/actions/user'
import { instance, findToken } from './axios';
import Header from './components/Header/Header';
import PageFallback from './components/PageFallback/PageFallback'
import { connect } from 'react-redux';
import PageBoundary from './ErrorBoundary/PageErrors/PageBoundary';
// import Index from './pages/Index/Index';
import PageNotFound from './pages/404/404';
const About = React.lazy(() => import('./pages/About/About'));
const Profile = React.lazy(() => import('./pages/Profile/Profile'));
const Login = React.lazy(() => import('./pages/Register/Login'));
const Index = React.lazy(() => import( './pages/Index/Index'));
const Register = React.lazy(() => import('./pages/Register/Register'));

class App extends Component {

  componentDidMount(){
    const token = findToken();
    instance.get('/auth/myprofile',{
      headers:{
        'X-Auth-Token' : token
      }
    }).then(doc => {
      this.props.getUser(doc.data)
    }).catch(err => {
      this.props.getUser('')
    })
  }

  render() {
    switch(this.props.user){
      case false:
        return <PageFallback />
        default :
        return (
            <div className="App">
          <Header />
           <Suspense fallback={<PageFallback />}>
           <Switch>
            <Route path='/register/login' exact render={() => (
              <PageBoundary>
                <Login />
                  </PageBoundary>
            )} />
            <Route path='/register' exact render={() => (
              <PageBoundary>
                <Register />
                  </PageBoundary>
            )}/>
            <Route path='/about' exact render={() => (
              <PageBoundary>
                <About />
                </PageBoundary>
            )}/>
            <Route path='/profile' exact render={() => (
              <PageBoundary>
                <Profile />
               </PageBoundary>
            )}/>
              <Route path="/" exact render={() => (
              <PageBoundary>
                <Index />
              </PageBoundary>
              
            )} />
   <Route render={() => (
              <PageBoundary>
                <PageNotFound />
              </PageBoundary>
              
            )} />
            </Switch>
           </Suspense>
        </div>
      );
    }
    
  }
}

const mapStateToProps = (state) => {
  return {
      user:state.user
  }
  }
  
  const mapDispatchToProps = (dispatch) => {
      return {
          getUser:(body) => dispatch(userActions.loginUser(body))
      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(App)