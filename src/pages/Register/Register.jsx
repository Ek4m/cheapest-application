import React, { useEffect, useRef, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { instance } from '../../axios';
import * as userActions from '../../redux/actions/user'
import RegSpinner from '../../components/RegisterSpinner/RegSpinner';
import './Register.css'
import { connect } from 'react-redux';

const Register = (props) => {

    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const rPasswordInput = useRef(null);
    const usernameInput = useRef(null);
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rPassword, setRPassword] = useState('');
    const [username, setUsername] = useState('');   

    const [isSubmitted, setSubmitted] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [rPasswordError, setRPasswordError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [serverError, setServerError] = useState([]);

    useEffect(() => {
        emailInput.current.focus()
    },[])

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
    const setRPasswordHandler = (e) => {
        setRPassword(rPasswordInput.current.value);
        if(rPasswordError){
            setRPasswordError("");
        }
    }
    const setUsernameHandler = (e) => {
        setUsername(usernameInput.current.value);
        if(usernameError){
            setUsernameError("");
        }
    }

    const signInHandler = (e) => {
        setServerError([])
        e.preventDefault()
       if(!isSubmitted){
           setSubmitted(true);
        let body = {
            email:email.trim(),
            password:password.trim(),
            password2:rPassword.trim(),
            username:username.trim()
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
              if(!body.password2 || body.password2 !== body.password){
                  setRPasswordError('Passwords are not identical');
                  isValid = false;
              }
              if(!body.username || body.username.length < 5){
                  setUsernameError('Username provided must be min. 5 characters');
                  isValid = false;
              }
              if(isValid){
                instance.post('/auth/register', body)
                .then(doc => {

                    instance.get('/auth/myprofile', {
                        headers:{
                            'X-Auth-Token': doc.data.token
                        }
                    }).then(userData => {
                        document.cookie = 'authToken=' + doc.data.token + '; ';
                        props.getUser(userData.data);
                        props.history.push('/')

                    }).catch(err => {
                        props.getUser('')
                    })
                    setSubmitted(false);
                })
                .catch((err) => {
                    setSubmitted(false);
                    if(err.response){
                        setServerError([...err.response.data.errors])
                    }
                })
              }else{
                  setSubmitted(false);
              }
       }
}

    useEffect(() => {
        document.title = 'Create your "Cheapest App" profile in seconds!!!';
    },[])

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
                    <h1>Register</h1>
                    <p>A fresh approach to shopping.</p>
                    <p>All the best for a whole lot less.</p>
                    <p>Feel-good shopping.</p>
                </div>
            </div>
            <div className="Register--Body">
        <form action="#" onSubmit={(e) => signInHandler(e)}>
        {errorContent}
        <div className="form--control">
        <label htmlFor="email" >email:</label>
        <input type="email"
        value={email}
        ref={emailInput}
        onChange={setEmailHandler}
        required={true}
        name="" id="email"/>
       {emailError ? <div className="Register--error__msg">{emailError}</div> : null}
        </div>
        <div className="form--control">
        <label htmlFor="password">password:</label>
        <input type="password"
        onChange={setPasswordHandler}
        ref={passwordInput} name="" 
        required={true}
        id="password"/>
               {passwordError ? <div className="Register--error__msg">{passwordError}</div> : null}

        </div>
        <div className="form--control">
        <label htmlFor="password">repeat password:</label>
        <input type="password"
        onChange={setRPasswordHandler}
        ref={rPasswordInput} name="" 
        required={true}
        id="password"/>
                      {rPasswordError ? <div className="Register--error__msg">{rPasswordError}</div> : null}

        </div>
        <div className="form--control">
        <label htmlFor="name">nickname:</label>
        <input type="text" name=""
        required={true}
        onChange={setUsernameHandler}
        ref={usernameInput} id="name"/>
                               {usernameError ? <div className="Register--error__msg">{usernameError}</div> : null}

        </div>
        <div className="Register--Link">
            <p>You already have an account?<Link to="/register/login"> Log in</Link></p>
        </div>
        <div className="form--control">
        <button disabled={isSubmitted} type="submit">Log in</button>
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
    
    export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))