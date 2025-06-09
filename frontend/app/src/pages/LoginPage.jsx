import React, { useEffect, useRef } from 'react'
import './LoginPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { authThunk } from '../store/authSlice';
import { useNavigate } from 'react-router';

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated } = useSelector(state => state.auth);

    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleSignIn = () => {
        dispatch(authThunk({
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }))
    }

     useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated]);

    return (
    <div className='login-page'>
        <h1>Sign In</h1>
        <form>
            <p>Sign In to your account</p>
            <input type='text' name='username' placeholder='Enter username' ref={usernameRef} />
            <input type='password' name='password' placeholder='Enter password' ref={passwordRef} />
            <button type='button' onClick={handleSignIn}>Sign In</button> 
        </form>
    </div>
    )
}
