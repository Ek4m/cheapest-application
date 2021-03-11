import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import withAuth from '../../hoc/withAuth';
import * as userActions from '../../redux/actions/user';
import './Profile.css';

class Profile extends React.PureComponent {
    state = {
        isMenuOpen:false
    }

    componentDidMount(){
        console.log(this.props);
        document.title = `Cheapest App!:: ${this.props.user.username}`;
        window.addEventListener('click', this.eventWindow)
     }

    componentWillUnmount(){
        window.removeEventListener('click', this.eventWindow)
    }

    eventWindow = (e) => {
        if(this.state.isMenuOpen){
            this.setState({
                isMenuOpen:false
            })
        }
    }

    onClickHandler = (e) => {
        e.stopPropagation();
        this.setState({
            isMenuOpen:!this.state.isMenuOpen
        })
    }

    onLogoutHandler = (e) => {
        document.cookie = 'authToken=;expires=Thu,01 Jan 1970 00:00:00 UTC; path=/;';
        this.props.getUser("");
        this.props.history.push("/")
    }


    render(){
        return (
            <div className="Profile">
             <div className="Profile--bck"></div>
             <div className="Profile--Container">
                <div className="Profile--Info__Head">
                <h2>{this.props.user.username}'s Profile</h2>
                <div className="Profile--Menu">
                    <div 
                    className="Profile--Menu__Arrow"
                    onClick={e => this.onClickHandler(e)}
                    ><i className="fas fa-chevron-down"></i></div>
                    <CSSTransition
                    in={this.state.isMenuOpen}
                    timeout={200}
                    unmountOnExit
                    mountOnEnter
                    classNames="profileMenu"
                    >
<div className="Profile--Menu__Content" onClick={(e) => e.stopPropagation()}>
    <Link to="/">Update</Link>
    <button onClick={(e) => this.onLogoutHandler(e)}>Logout</button>
</div>
                    </CSSTransition>
                </div>
                </div>
                <div className="Profile--control">
                    <h4>Email:</h4>
                    <h4>{this.props.user.email}</h4>
                </div>
                <hr/>
                <div className="Profile--control">
                    <h4>Username:</h4>
                    <h4>{this.props.user.username}</h4>
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
    
    const mapDispatchToProps = (dispatch) => {
        return {
            getUser:(body) => dispatch(userActions.loginUser(body))
        }
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(withAuth(withRouter(Profile)))