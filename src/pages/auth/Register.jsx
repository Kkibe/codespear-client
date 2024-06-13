import { Google, Facebook} from '@mui/icons-material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { signUp, updateUser } from '../../firebase';
import './Auth.css';


export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const handleRegister = (e) => {
    e.preventDefault();
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(email && password) {
        if(email.match(mailformat)){
          if(password.match(passw)) {
            const user = signUp(email, password);
            if(!user.displayName) {
              updateUser(name);
            } else{
              return;
            }
           } else {
            alert('Wrong password format!')
            return ; 
           }
         } else {
           alert("You have entered an invalid email address!")
           return ;
        }
    } else {
      alert('enter email and password');
      return;
    }
  } 
  return (
    <div className='page auth'>
            <form onSubmit={handleRegister}>
                <h1>Create Account</h1>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button type='submit' className='button'>SIGN UP</button>
                <span>
                  Continue With:
                </span>
                <div className='iconContainer'>
                  <button className='button google'><span>Google</span><Google /> </button>
                  <button className='button facebook'><span>Facebook</span><Facebook /></button>
                </div>
            </form>
            <span>
              Already registered? <NavLink to='/login' title='Sign In' reloadDocument>Login here</NavLink>
            </span>
    </div>
  )
}
