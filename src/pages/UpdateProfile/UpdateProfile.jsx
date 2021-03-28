import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import withAuth from '../../hoc/withAuth'
import RegSpinner from '../../components/RegisterSpinner/RegSpinner'
import './UpdateProfile.css';
import * as userActions from '../../redux/actions/user';
import { findToken, instance } from '../../axios';
import { toast } from 'react-toastify';

let success = (msg) => toast.success(msg,{
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    })

    let error = (err) => toast.error(err, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

const UpdateProfile = (props) => {

    const [email, setEmail] = useState('');
    const [infoSubmitted, setInfoSubmitted] = useState(false);
    const [username, setUsername] = useState('');


    const emaiInput = useRef();
    const usernameInput = useRef();


    const [newPassword, setNewPassword] = useState('');
    const [cNewPassword, setCNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [passwordSubmitted, setPasswordSubmitted] = useState(false)

    const newPasswordInput = useRef();
    const cNewPasswordInput = useRef();
    const oldPasswordInput = useRef();

    const onEmailChange = (e) => {
        setEmail(emaiInput.current.value);
    }

    const onUsernameChange = (e) => {
        setUsername(usernameInput.current.value);
    }

    const onInfoSubmit = (e) => {
      e.preventDefault();  
     if(!infoSubmitted){
        setInfoSubmitted(true)
        let obj = {
            emailNew:email.trim(),
            usernameNew:username.trim()
        }
        instance.put('/auth/updateprofile',obj, {
            headers:{
                'X-Auth-Token': findToken()
            }
        })
        .then(response => {
            props.getUser(response.data);
            setInfoSubmitted(false);
            success('Updated successfully')
        })
        .catch(err => {
            if(err.response){
                err.response.data.errors.forEach((err) => {
                    error(err.msg)
                })
              }else if(err.message){
                error(err.message)
              }else{
                  error('Something went wrong')
              }
            setInfoSubmitted(false);

        })
     }
    } 

    const onPasswordChange = (e) =>{
        setNewPassword(newPasswordInput.current.value);
    }

    const onCPasswordChange = (e) =>{
        setCNewPassword(cNewPasswordInput.current.value);
    }

    const onOldPasswordChange = (e) => {
        setOldPassword(oldPasswordInput.current.value)
    }

    const onPasswordSubmit = (e) => {
        e.preventDefault();  
       if(!passwordSubmitted){
          setPasswordSubmitted(true)
          let obj = {
             passwordOld:oldPassword.trim(),
             passwordNew:newPassword.trim(),
             passwordNew2:cNewPassword.trim()
          }
          instance.put('/auth/changepassword',obj, {
              headers:{
                  'X-Auth-Token': findToken()
              }
          })
          .then(response => {
              setPasswordSubmitted(false);
              success('Password updated successfully')
          })
          .catch(err => {
              if(err.response){
                err.response.data.errors.forEach((err) => {
                    error(err.msg)
                })
              }else if(err.message){
                error(err.message)
              }else{
                  error('Something went wrong')
              }
              setPasswordSubmitted(false);
  
          })
       }
      } 


    useEffect(() => {
        document.title = 'Update your profile';
        if(props.user){
            setUsername(props.user.username)
            setEmail(props.user.email)
        }
    },[])

    return (
        <div className="UpdateProfile">
        <div className="Update--Container">
        <div className="Form--Info__Update">
            <h1>Update User Info</h1>
                <form action="#" onSubmit={onInfoSubmit}>
                <div className="Form--Update__Control">
                    <label htmlFor="update--email">New Email:</label>
                    <input type="email" 
                    id="update--email" 
                    value={email}
                    required
                    onChange={onEmailChange}
                    ref={emaiInput}
                    placeholder="Email" />
                </div>
                <div className="Form--Update__Control">
                    <label htmlFor="update--username">New Username:</label>
                    <input type="text"
                    onChange={onUsernameChange}
                    value={username}
                    required
                    ref={usernameInput}  
                    id="update--username" 
                    placeholder="Username" />
                </div>
                <div className="Form--Update__Control">
                  <button 
                  disabled={infoSubmitted}
                  type="submit">Update!</button>
                  {infoSubmitted && <RegSpinner />}
                </div>
                </form>
            </div>
            <div className="Form--Info__Update">
            <h1>Update Password</h1>

                <form action="#" onSubmit={onPasswordSubmit}>
                <div className="Form--Update__Control">
                    <label htmlFor="update--password">New Password:</label>
                    <input type="password"
                     id="update--password" 
                     ref={newPasswordInput}
                     required
                     onChange={onPasswordChange}
                     placeholder="New Password" />
                </div>
                <div className="Form--Update__Control">
                    <label htmlFor="update--cpassword">Confirm New Password:</label>
                    <input type="password" 
                    id="update--cpassword" 
                    ref={cNewPasswordInput}
                    onChange={onCPasswordChange}
                    required
                    placeholder="Confirm Password" />
                </div>
                <div className="Form--Update__Control">
                    <label htmlFor="update--opassword">Old password:</label>
                    <input type="password"
                    id="update--opassword" 
                    ref={oldPasswordInput}
                    required
                    onChange={onOldPasswordChange}
                    placeholder="Recent Password" />
                </div>
                <div className="Form--Update__Control">
                   <button type="submit" disabled={passwordSubmitted}
                   >Update!</button>
                    {passwordSubmitted && <RegSpinner />}
                </div>
                </form>
            </div>
        </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        user:state.user,
        wishlist:state.wishlist
    }
    }
    
    const mapDispatchToProps = (dispatch) => {
        return {
            clearWishlist:() => dispatch({type:'CLEAR_WISHLIST'}),
            getUser:(usr) => dispatch(userActions.loginUser(usr))
        }
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(withAuth(UpdateProfile))