import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Topbar } from './components/Topbar';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import {Blogs} from './pages/Blogs';
import Resources from './pages/Resources';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Error } from './pages/Error';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import {
  Routes,
  Route,
} from "react-router-dom";
import { useAuth } from './firebase';
import { ArrowUpward } from '@mui/icons-material';
import ModalPopup from './components/ModalPopup';



const Container = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 80px;
  overflow-x: hidden;
  position:relative;
  
`

const ButtonToTop = styled.button`
    width: 50px;
    height: 40px;
    position: fixed;
    cursor: pointer;
    bottom: 10px;
    right: 20px;
    border: none;
    outline: none;
    border: 1px solid #68478D;
    background-color: transparent;
    border-radius: 50%;
    z-index: 99;
    transition: all 0.4s ease-in-out;
    &:hover{
      background-color: #ebf4fc;
      cursor: pointer;
}
`


export default function App() {
  const signedUser = useAuth();
  const [user, setUser] = useState('');
  useEffect(() => {
    setUser(signedUser);
  }, [signedUser]);

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
  })}

  return (
    <Container>
      <Topbar />
      <ModalPopup />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='courses' element={<Courses />} />
          <Route path='blog' element={<Blogs />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='resources' element={<Resources />} />
          <Route path='register' element={!user ? <Register /> : () => {return}} />
          <Route path='login' element={!user ? <Login /> : () => {return}} /> 
          <Route path="*"  element={<Error />} />
      </Routes>
      <Newsletter />
      <Footer />
      <ButtonToTop onClick={handleScroll} >
        <ArrowUpward style={{color: "#68478D", fontSize: "24px"}}/>
      </ButtonToTop>
    </Container>
  )
}
