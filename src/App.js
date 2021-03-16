import React, { PureComponent, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import * as wishlistActions from './redux/actions/wishlist'
import * as userActions from './redux/actions/user'
import { instance, findToken } from './axios';
import Header from './components/Header/Header';
import PageFallback from './components/PageFallback/PageFallback'
import { connect } from 'react-redux';
import PageBoundary from './ErrorBoundary/PageErrors/PageBoundary';
import PageNotFound from './pages/404/404';
import Login from './pages/Register/Login';
import WishList from './pages/WishList/WishList';
import RestaurantList from './components/RestaurantList/RestaurantList';
import Restaurant from './pages/Restaurant/Restaurant';
const About = React.lazy(() => import('./pages/About/About'));
const Profile = React.lazy(() => import('./pages/Profile/Profile'));
// const Login = React.lazy(() => import('./pages/Register/Login'));
const Index = React.lazy(() => import( './pages/Index/Index'));
const Register = React.lazy(() => import('./pages/Register/Register'));
class App extends PureComponent {

  componentDidMount(){
    const token = findToken();

    instance.get('/auth/myprofile',{
      headers:{
        'X-Auth-Token' : token
      }
    }).then(doc => {
      this.props.getUser(doc.data);
    }).catch(err => {
      this.props.getUser('')
    })
    .finally(() => {
      this.props.getWishlists();
    })
  }

  render() {
    switch(this.props.user){
      case false:
        return <PageFallback />
        default :
        return (
            <div className="App" id="App">
         <Header />
           <Suspense fallback={<PageFallback />}>
           <PageBoundary>
           <Switch>
            <Route path='/register/login' exact component={Login} />
            <Route path='/register' exact component={Register}/>
            <Route path='/about' exact component={About}/>
            <Route path='/profile' exact component={Profile}/>
            <Route path='/restaurants' exact component={RestaurantList}/>
            <Route path='/restaurants/:id' exact component={Restaurant}/>
            <Route path='/wishlist' exact component={WishList}/>
              <Route path="/" exact component={Index} />
   <Route component={PageNotFound} />
            </Switch>
            </PageBoundary>
           </Suspense>
        </div>
      );
    }
    
  }
}

const mapStateToProps = (state) => {
  return {
      user:state.user,
      wishlist:state.wishlist
  }
  }
  
  const mapDispatchToProps = (dispatch) => {
      return {
          getUser:(body) => dispatch(userActions.loginUser(body)),          deleteWishlist:(id) => dispatch(wishlistActions.deleteWishlist(id)),
          getWishlists:() => dispatch(wishlistActions.getWishlists())

      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(App)