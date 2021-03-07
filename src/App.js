import React, { Component, Profiler, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import PageFallback from './components/PageFallback/PageFallback'

const About = React.lazy(() => import('./pages/About/About'));
const Login = React.lazy(() => import('./pages/Register/Login'));
const Index = React.lazy(() => import( './pages/Index/Index'));
const Register = React.lazy(() => import('./pages/Register/Register'));

class App extends Component {
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

export default App;
