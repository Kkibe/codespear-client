import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { TopNav } from './components/topnav/TopNav';
import { Newsletter } from './components/newsletter/Newsletter';
import { Footer } from './components/footer/Footer';

import { Home } from './pages/home/Home';
import { Courses } from './pages/courses/Courses';
import { About } from './pages/about/About';
import { Contact } from './pages/contact/Contact';
import { Resources } from './pages/resources/Resources';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Blogs } from './pages/blogs/Blogs';
import { Error } from './pages/error/Error';
import Course from './pages/courses/Course';
import Blog from './pages/blogs/Blog';
import Dashboard from './pages/dashboard/Dashboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <TopNav />
      <ScrollToTop />
      <main id="main" style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<Course />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
