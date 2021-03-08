import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import withAuth from '../../hoc/withAuth';
import * as userActions from '../../redux/actions/user';
import './Profile.css';

class Profile extends React.PureComponent {

    state = {
        isHeaderOpen:false
    }
    eventWindow = () => {
        this.setState({
            isHeaderOpen:false
        })
    }

    componentDidMount(){
        console.log(this.props);
        document.title = `Cheapest App!:: ${this.props.user.username}`;
        window.addEventListener('click', this.eventWindow)
     }
    componentWillUnmount(){
        window.removeEventListener('click', this.eventWindow)
    }


    onClickHandler = (e) => {
        e.stopPropagation();
        this.setState({
            isHeaderOpen:!this.state.isHeaderOpen
        })
    }

    onLogoutHandler = () => {
        document.cookie = 'authToken=;expires=Thu,01 Jan 1970 00:00:00 UTC; path=/;';
        this.props.getUser("");
        this.props.history.push("/")
    }

    render(){
        return (
            <div className="Profile">
             <div className="Profile--Header">
            <div className="Profile--Header__Title" 
            onClick={e => this.onClickHandler(e)}>
                <i className="fas fa-cogs"></i>
                <p>Settings</p>
            </div>
              <div className="Profile--Header__Container">
              <CSSTransition 
                timeout={200}
                mountOnEnter
                unmountOnExit
                classNames="Profile--Header__Menu"
                in={this.state.isHeaderOpen}
                >
            <div className="Profile--Header__Content">
            <ul>
            <li>
                <i className="fas fa-user-edit"></i>
                <Link to="/profile/update">Update Info</Link></li>
            <li>
                <i className="fas fa-sign-out-alt"></i>
                <div onClick={this.onLogoutHandler}>Logout</div>
                </li>
            </ul>
</div>
                </CSSTransition>
              </div>
            </div>
            <div className="Profile--Container">
                
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
    
    const mapDispatchToProps = (dispatch) => {
        return {
            getUser:(body) => dispatch(userActions.loginUser(body))
        }
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Profile))