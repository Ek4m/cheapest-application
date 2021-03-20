import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import * as userActions from '../../redux/actions/user';
import { instance } from '../../axios';

import './Register.css'
import RegSpinner from '../../components/RegisterSpinner/RegSpinner';

const Login = (props) => {
    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isSubmitted, setSubmitted] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [serverError, setServerError] = useState([]);

    const setEmailHandler = (e) => {
        setEmail(emailInput.current.value)
        if(emailError){
            setEmailError("");
        }
    }
    const setPasswordHandler = (e) => {
        setPassword(passwordInput.current.value);
        if(passwordError){
            setPasswordError("");
        }
    }
    useEffect(() => {
        document.title = 'Login now to benefit from our service';
    },[])

    const logIn = (e) => {
        e.preventDefault()
        setServerError([])
        if(!isSubmitted){
            setSubmitted(true);
        let body = {
            email:email.trim(),
            password:password.trim(),
        }
       let isValid = true;
            const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
              if(!body.email || !emailRegEx.test(body.email)){
                  setEmailError('Enter a valid email');
                  isValid = false;
              }
              if(!body.password || body.password.length < 6){
                  setPasswordError('Password provided must be min. 6 characters');
                  isValid = false;
              }
              if(isValid){
                instance.post('/auth/login', body)
                .then(doc => {
                    instance.get('/auth/myprofile', {
                        headers:{
                            'X-Auth-Token': doc.data.token
                        }
                    }).then(userData => {
                        document.cookie = 'authToken=' + doc.data.token + '; ';
                        props.getUser(userData.data);
                        props.history.push('/');
                    }).catch(err => {
                        console.log(err)
                        if(err.response){
                            let errorArr = err.response.data.errors.map(err => err.msg);
                                setServerError([...errorArr])
                            }else if(err.message){
                            setServerError([err.message])
                        }
                    })
                })
                .catch((err) => {
                    console.log(err)
                    if(err.response){
                        let errorArr = err.response.data.errors.map(err => err.msg);
                            setServerError([...errorArr])
                        }else if(err.message){
                        setServerError([err.message])
                    }
                    setSubmitted(false);
                })
              }else{
                  setSubmitted(false);
              }
        }
    }
let errorContent = null;
if(serverError.length > 0){
errorContent =    serverError.map((err, index) => (
               <div className="Register--error__msg"
               key={err + Date.now() + index}
               >{err}</div>
        ))
}
    return (
        <div className='Register'>
        <div className="Register--bck"></div>
        <div className="Register--Container">
        <div className="Register--Info">
            <div className="Register--Info__Body">
                <h1>Log in</h1>
                <p>Don’t worry, we have it.</p>
                <p>Discover the difference.</p>
                <p>Expect more. Pay less.</p>
            </div>
        </div>
        <div className="Register--Body">
    <form action="#" onSubmit={e => logIn(e)}>
    {errorContent}
    <div className="form--control">
    <label htmlFor="email">email:</label>
    <input type="email" 
    required
    onChange={e => setEmailHandler(e)}
    ref={emailInput}
    id="email"
    value={email}
    />
    {emailError ? <div className="Register--error__msg">{emailError}</div> : null}
    </div>
    <div className="form--control">
    <label htmlFor="password">password:</label>
    <input 
    required
    type="password" 
    ref={passwordInput} 
    id="password"
    onChange={e => setPasswordHandler(e)}
    />
    {passwordError ? <div className="Register--error__msg">{passwordError}</div> : null}
    </div>
    <div className="Register--Link">
        <p>Don't you have an account?<Link to="/register"> Create one.</Link></p>
    </div>
    <div className="form--control">
    <button disabled={isSubmitted} type="submit">Register</button>
    {isSubmitted ? <RegSpinner /> : null}
    </div>
    </form>
        </div>
        </div>
        </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(withRouter(Login)))