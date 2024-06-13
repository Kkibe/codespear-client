import { Close, LightMode, Login, Logout, MenuOpen, MenuOutlined, Nightlight, Search } from '@mui/icons-material';
import React, { useContext, useRef } from 'react';
import './TopNav.css';
import { useEffect, useState } from 'react';
import Image from '../../assets/icon.png';
import UserImage from '../../assets/person.png';
import { Outlet, NavLink } from "react-router-dom";
import { addCourse, logOut, useAuth } from '../../firebase';
import { ModeContext } from '../../ModeContext';
import { themes } from '../../data';


export const TopNav = () => {
  const signedUser = useAuth();
  const [user, setUser] = useState('');
  const {mode, setMode} = useContext(ModeContext);
  const [opened, setOpened] = useState(false);
  const target = useRef(null);
  
  const handleSignOut = () => {
    logOut();
    window.localStorage.removeItem('modal');
  }
  const handleAdd = () => {
    addCourse();
  }
  
  const hadndleToggleTheme = () => {
    const item = themes[Math.floor(Math.random()*themes.length)]
    document.documentElement.style.setProperty('--primary', item.primary);
    document.documentElement.style.setProperty('--secondary', item.secondary);
  }

useEffect(() => {
  setUser(signedUser);
}, [signedUser]);
useEffect(() => {
  if(mode){
    document.body.classList.add("darkMode");
  } else {
    document.body.classList.remove("darkMode");
  }
}, [mode]);

useEffect(() => { 
  document.addEventListener('scroll', () => {
    setOpened(false);
  });
  document.addEventListener('keydown', () => {
    setOpened(false);
  });
  hadndleToggleTheme();
}, []); 
  
  return (
    <div className='topnav'>
      <NavLink to={"/"}><img src={Image} className='icon' onClick={handleAdd} alt='codespear-logo' title='codespear'/></NavLink>
      
      <div className='search'>
        <input type='search'/>
        <Search className='search-icon'/>
      </div>
      <nav>
        <NavLink to="/" title="Home" reloadDocument>Home</NavLink>
        <NavLink to="/courses" title="Courses" reloadDocument>Courses</NavLink>
        <NavLink to="/blog" title="Blogs" reloadDocument>Blogs</NavLink>
        <NavLink to="/about" title="About" reloadDocument>About</NavLink>
        <NavLink to='/contact' title="Contact" reloadDocument>Contact</NavLink>
        <NavLink to='/resources' title="Resources" reloadDocument>Resources</NavLink>
      </nav>

        {!user ? (<div className='userContainer'>
            <NavLink to='/login' className='button' title='Sign In' reloadDocument>LOGIN</NavLink>
            <NavLink to='/register' className='button' title='Get Started' reloadDocument>REGISTER</NavLink>
            <button  className="button mode" onClick = {() => setMode(!mode)}>{mode ? <Nightlight /> :<LightMode />} </button>
          </div>) : <img src={user.photoURL ? user.photoURL : UserImage} className='icon' alt={user.displayName}/>
        }
        {
          opened && (
            <div className='userCard' ref={target}>
              <span className="div">
                <button  className="button mode" onClick = {() => setMode(!mode)}>{mode ? <Nightlight /> :<LightMode />} </button>
                <div className="close"><Close onClick={() => setOpened(!opened)}/></div>
              </span>
                <NavLink to={'/'} className='link' title="Home" reloadDocument>Home</NavLink>
                <NavLink to={'/courses'} className='link' title="Explore Courses" reloadDocument>Courses</NavLink>
                <NavLink to={'/blog'} className='link' title="Discover Articles" reloadDocument>Blogs</NavLink>
                <NavLink to={'/about'} className='link' title="About" reloadDocument>About Us</NavLink>
                <NavLink to={'/contact'} className='link' title="Contact">Contact US</NavLink>
                <NavLink to={'/resources'} className='link' title='Discover Resources' reloadDocument>Resources</NavLink>
                <NavLink to={'/my-profile'} className='link' title='Profile' reloadDocument>My Account</NavLink>
                {user ? <button className='button logout' onClick={handleSignOut} title='Sign Out'>Log out <Logout  style={{
                  marginLeft: '10px'
                }}/></button> :<NavLink to='/login' className='button' title='Get Started' reloadDocument>Login<Login  style={{
                  marginLeft: '10px'
                }}/></NavLink>}
            </div>
          )
        }
      {opened ? <MenuOpen className='menu' onClick={() => setOpened(!opened)}/> : <MenuOutlined className='menu' onClick={() => setOpened(!opened)}/>}
      <Outlet />
    </div>
  )
}
