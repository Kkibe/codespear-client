import React, { useEffect, useState } from 'react';
import { CloseOutlined, Google, Facebook} from '@mui/icons-material';
import { signIn, useAuth } from '../../firebase';
import './ModalPopup.css';
import '../../pages/auth/Auth.css';

export default function ModalPopup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [opened, setOpened] = useState(true);
  const signedUser = useAuth();
  
  const handleLogin = (e) => {
    e.preventDefault();
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email && password) {
      if(email.match(mailformat)){
        signIn(email, password);
      } else {
        alert("You have entered an invalid email address!");
      }
      
    } else return; 
    
  }

  const handleClose = () => {
    window.localStorage.setItem("modal", "login");
    setOpened(false);
  };

  useEffect(() => {
    if(window.location.pathname === "/login" || window.location.pathname === "/register") {
      setOpened(false);
    }
    if(localStorage.key('modal') || signedUser){
      setOpened(false);
    }
  }, []);

  useEffect(() => {
    signedUser && setOpened(false);
  }, [signedUser]);


  return (
    <div className="modal auth" style={{display: opened ? "block" : "none"}}>
        <CloseOutlined className='close' onClick={handleClose}/>
        <form onSubmit={handleLogin}>
        <h4>Login To ACCOUNT</h4>
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
</div>	
  )
}
