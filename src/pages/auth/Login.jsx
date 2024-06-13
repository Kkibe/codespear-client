import { Google, Facebook} from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { signIn } from '../../firebase';
import './Auth.css';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const handleLogin = (e) => {
    e.preventDefault();
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email && password) {
      if(email.match(mailformat)){
        signIn(email, password);
      } else {
        setError("You have entered an invalid email address!");
      }
      
    } else return; 
  }


  useEffect(() => {
    setTimeout(() => {
        error && setError(null);
        success && setSuccess(null);
    }, 2000);
}, [success, error]);
  return (
    <div className='page auth'>
            <form onSubmit={handleLogin}>
                <h1>Welcome Back</h1>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type='submit' className='button'>SIGN IN</button>
                <span>
                  Sign In With:
                </span>
                <div className='iconContainer'>
                  <button className='button google'><span>Google</span><Google /> </button>
                  <button className='button facebook'><span>Facebook</span><Facebook /></button>
                </div>
            </form>
            <span>
              Don't have an account? <NavLink to='/register' title='Get Started Now' reloadDocument>Register here</NavLink>
            </span>
    </div>
  )
}
