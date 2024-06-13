import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import { useAuth } from './firebase';
import { ArrowUpward, Message } from '@mui/icons-material';

import { TopNav } from './components/topnav/TopNav';
import { Newsletter } from './components/newsletter/Newsletter';
import { Footer } from './components/footer/Footer';
import ModalPopup from './components/modal/ModalPopup';


import { Home } from './pages/home/Home';
import { Courses } from './pages/courses/Courses';
import {Blogs} from './pages/blogs/Blogs';
import { About } from './pages/about/About';
import { Contact } from './pages/contact/Contact';
import {Resources} from './pages/resources/Resources';
import { Error } from './pages/error/Error';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Blog } from './pages/blogs/Blog';
import Course from './pages/courses/Course';


export default function App() {
  const signedUser = useAuth();
  const [user, setUser] = useState('');
  useEffect(() => {
    setUser(signedUser);
  }, [signedUser]);

  return (
    <main>
      <TopNav />
      <ModalPopup />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='courses' element={<Courses />} />
          <Route path='courses/:id' element={<Course />} />
          <Route path='blog' element={<Blogs />} />
          <Route path='blog/:id' element={<Blog />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='resources' element={<Resources />} />
          <Route path='register' element={!user ? <Register /> : () => {return}} />
          <Route path='login' element={!user ? <Login /> : () => {return}} /> 
          <Route path="*"  element={<Error />} />
      </Routes>
      <Newsletter />
      <Footer />
      <button className='button chatbot' title='chat with us'>
        <Message/>
      </button>
    </main>
  )
}
