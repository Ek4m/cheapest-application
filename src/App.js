import React, { PureComponent, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import * as wishlistActions from './redux/actions/wishlist'
import * as userActions from './redux/actions/user'
import { instance, findToken } from './axios';
import Header from './components/Header/Header';
import PageFallback from './components/PageFallback/PageFallback'
import { connect } from 'react-redux';
import PageBoundary from './ErrorBoundary/PageErrors/PageBoundary';
import PageNotFound from './pages/404/404';
import Login from './pages/Register/Login';
import Order from './pages/Order/Order';
import { ToastContainer } from 'react-toastify';

const Restaurant = React.lazy(() => import('./pages/Restaurant/Restaurant'));
const UpdateProfile = React.lazy(() => import('./pages/UpdateProfile/UpdateProfile'));
const WishList = React.lazy(() => import('./pages/WishList/WishList'));
const ProductPage = React.lazy(() => import('./pages/ProductPage/ProductPage'));
const RestaurantList = React.lazy(() => import('./components/RestaurantList/RestaurantList'));
const About = React.lazy(() => import('./pages/About/About'));
const Products = React.lazy(() => import('./pages/Products/Products'));
const Profile = React.lazy(() => import('./pages/Profile/Profile'));
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
  }

  render() {
    switch(this.props.user){
      case false:
        return <PageFallback />
        default :
        return (
            <div className="App" id="App">
         <Header />
         <ToastContainer />
           <Suspense fallback={<PageFallback />}>
           <PageBoundary>
           <Switch>
            <Route path='/register/login' exact component={Login} />
            <Route path='/register' exact component={Register}/>
            <Route path='/about' exact component={About}/>
            <Route path='/profile' exact component={Profile}/>
            <Route path='/profile/update' exact component={UpdateProfile}/>
            <Route path='/restaurants' exact component={RestaurantList}/>
            <Route path='/products' exact component={Products}/>
            <Route path='/products/:id' exact component={ProductPage}/>
            <Route path='/restaurants/:id' exact component={Restaurant}/>
            <Route path='/my/orders/:id' exact component={Order}/>
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
          getUser:(body) => dispatch(userActions.loginUser(body)),         
          deleteWishlist:(id) => dispatch(wishlistActions.deleteWishlist(id))
      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(App)