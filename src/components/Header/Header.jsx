import React, { useEffect, useState } from 'react';
import HeaderLink from './HeaderLink';
import './Header.css';
import { connect } from 'react-redux';
class Header extends React.PureComponent {
    //state
 state = {
     isOpen:false
 }
 componentDidMount(){
    window.addEventListener('click', () => {
        if(this.state.isOpen){
            this.setState({
                isOpen:false
            })
        }
    })
 }

    //methods
    setOpenHandler = (e) => {
        e.stopPropagation()
     if(!this.state.isOpen){
        this.setState({
            isOpen:true
        })
     }
    }
    setCloseHandler = (e) => {
        e.stopPropagation()
        if(this.state.isOpen){
            this.setState({
                isOpen:false
            })
        }
    }
    clickHeaderHandler = (e) => {
        e.stopPropagation();
    }

    //render
  render(){
    let cls = this.state.isOpen ? "" : "Header--Close";
    let clsArrow = ! this.state.isOpen ? "" : "Header--arrow__Close";
    return (
        <div id="Header" className={`Header ${cls}`}
        onClick={e=> this.clickHeaderHandler(e)}
        onMouseOut={(e) => this.setCloseHandler(e)}
         onMouseOver={(e) => this.setOpenHandler(e)}
         >
           <div className="Header--nav">
           <ul>
            <HeaderLink path="/"
            title="Home"
            >
                <i className="fas fa-home"></i>
            </HeaderLink>
            <HeaderLink path="/about"
            title="About"
            >
            <i className="fas fa-info-circle"></i>
            </HeaderLink>
          {this.props.user ?   <HeaderLink path="/profile"
            title="Profile"
            >
            <i className="fas fa-user"></i>
            </HeaderLink> : null}
            <HeaderLink path="/register"
            title="Sign Up"
            >
            <i className="fas fa-user-plus"></i>
            </HeaderLink>
            <HeaderLink path="/register/login"
            title="Login"
            >
            <i className="fas fa-sign-in-alt"></i>
            </HeaderLink>
            </ul>
           </div>
           <div className="Header--arrow">
               <div className={`Header--arrow__arrow ${clsArrow}`} onClick={(e) => this.setOpenHandler(e)}>
               <i className="fas fa-chevron-right"></i>
               </div>
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
