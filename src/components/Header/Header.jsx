import React, { Fragment } from 'react';
import HeaderLink from './HeaderLink';
import './Header.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import SideDrawerLink from './SideDrawerLink';
class Header extends React.Component {

    state = {
        isMenuOpen:false
    }

    onClickHandler = () => {
        this.setState({
            isMenuOpen:!this.state.isMenuOpen
        })
    }

    onCloseHandler = () => {
        this.setState({
            isMenuOpen:false
        })
    }

  render(){
      let headerUpper;
      let sideDrawer;
      if(this.props.user === ""){
        headerUpper = <Fragment>
          <HeaderLink path="/register"
          title="Sign Up"/>
          <HeaderLink path="/register/login"
          title="Login" />
           </Fragment>

        sideDrawer = <Fragment>
            <SideDrawerLink title="Login" url="/register/login" 
            clicked={this.onCloseHandler}
            />
            <SideDrawerLink title="Sign Up" url="/register" 
            clicked={this.onCloseHandler}
            />
        </Fragment>

      }else{
        headerUpper = <Fragment>
              <HeaderLink path="/profile"
            title="Profile"
            />
            <HeaderLink path="/wishlist"
            title="Wishlist"
            />
          </Fragment>

sideDrawer = <Fragment>
<SideDrawerLink title="Profile" url="/profile" 
clicked={this.onCloseHandler}
/>
<SideDrawerLink title="Wishlist" url="/wishlist"
clicked={this.onCloseHandler}
/>
</Fragment>
      }
    return (
        <div id="Header" className='Header '>
           <div className="Header--Upper">
           <div className="Header--NavBrand">
                <Link to="/"   
                onClick={this.onCloseHandler}>Cheapest</Link>
            </div>
           <div className="Header--nav">
           <ul>
            <HeaderLink path="/about"
            title="About"
            clicked={this.onCloseHandler}
            />
         {headerUpper}
            </ul>
           </div>
           <div className="HamMenu"
           onClick={this.onClickHandler}
           >
               <div className="HamMenuLine"></div>
               <div className="HamMenuLine"></div>
               <div className="HamMenuLine"></div>
           </div>
           </div>
          <div className="Header--Bottom">
          <CSSTransition
           timeout={200}
           in={this.state.isMenuOpen}
           unmountOnExit
           mountOnEnter
           classNames="sidedrawer"
           >
               <div className="SideDrawer">
<ul>
<SideDrawerLink title="About" 
url="/about"
clicked={this.onCloseHandler}

/>
{sideDrawer}
</ul>
               </div>
           </CSSTransition>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        user:state.user
    }
}

const mapDispatchToProps = (state) => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
