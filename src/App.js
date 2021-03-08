import React, { Component, Profiler, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import * as userActions from './redux/actions/user'
import { instance, findToken } from './axios';
import Header from './components/Header/Header';
import PageFallback from './components/PageFallback/PageFallback'
import { connect } from 'react-redux';

const About = React.lazy(() => import('./pages/About/About'));
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
      console.log('SUCCESS', doc.data)
      this.props.getUser(doc.data)
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
        <div className="App">
        <Header />
         <Suspense fallback={<PageFallback />}>
         <Switch>
          <Route path='/register/login' component={Login} />
          <Route path='/register' component={Register}/>
          <Route path='/about' component={About}/>
            <Route path="/" component={Index} />
          </Switch>
         </Suspense>
      </div>
    );
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