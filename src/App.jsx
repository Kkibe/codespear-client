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
import { Pricing } from './pages/pricing/Pricing';
import { Terms } from './pages/legal/Terms';
import { Privacy } from './pages/legal/Privacy';
import { Cookies } from './pages/legal/Cookies';
import { Conduct } from './pages/legal/Conduct';

const Course = lazy(() => import('./pages/courses/Course'));
const Blog = lazy(() => import('./pages/blogs/Blog'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Admin = lazy(() => import('./pages/admin/Admin'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PageFallback() {
  return <div className="page"><div className="loading-screen"><div className="spinner spinner-lg" /></div></div>;
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
          <Route path="/courses/:slug" element={<Suspense fallback={<PageFallback />}><Course /></Suspense>} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog/:slug" element={<Suspense fallback={<PageFallback />}><Blog /></Suspense>} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Suspense fallback={<PageFallback />}><Dashboard /></Suspense>} />
          <Route path="/admin" element={<Suspense fallback={<PageFallback />}><Admin /></Suspense>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/conduct" element={<Conduct />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
